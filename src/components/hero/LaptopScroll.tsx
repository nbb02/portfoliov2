import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Environment,
  useGLTF,
  useTexture,
  ContactShadows,
} from "@react-three/drei"
import { Suspense, useEffect, useMemo, useRef } from "react"
import type { RefObject } from "react"
import type { GLTF } from "three-stdlib"
import laptopModelUrl from "../../assets/laptop/mac-draco.glb"
import laptopScreenImage from "../../assets/hero/screen-panel.jpg"
import { clamp01, easeInOutCubic, lerp } from "./easing"
import { SCREEN_MAX_DPR, SCREEN_MIN_DPR } from "./screenGeometry"
import { phoneDollyProgress, phoneHeroScale } from "./phoneTimeline"
import { HERO_PANEL_KEY, PHONE_PANEL_KEY } from "./panelCapture"
import { releaseScreenTexturesExcept, screenTexture } from "./screenTextures"
import FallbackEnvironment from "./FallbackEnvironment"
import PhoneModel from "./PhoneModel"

type LaptopGLTF = GLTF & {
  nodes: {
    Cube008: THREE.Mesh
    Cube008_1: THREE.Mesh
    Cube008_2: THREE.Mesh
    keyboard: THREE.Mesh
    Cube002: THREE.Mesh
    Cube002_1: THREE.Mesh
    touchbar: THREE.Mesh
  }
  materials: {
    aluminium: THREE.Material
    "matte.001": THREE.Material
    keys: THREE.Material
    trackpad: THREE.Material
    touchbar: THREE.Material
  }
}

type ProgressRef = RefObject<number>

export type ScreenRect = {
  left: number
  top: number
  width: number
  height: number
}

/**
 * How far back to stand so the laptop sits inside the hero slot of a
 * full-viewport canvas, and how far the composition is shifted to put it there.
 */
export type HeroFit = {
  distanceScale: number
  shiftX: number
}

const HERO_TARGET = new THREE.Vector3(0, 0, 0)
const HERO_AZIMUTH = Math.atan2(-5, -15)
/**
 * The live hero leaves aiming to OrbitControls, which clamps the polar angle, so
 * the camera sits slightly above the origin rather than level with it. Reproduce
 * that here or the first frame will not match the current hero.
 */
const HERO_POLAR = Math.PI / 2.2
const HERO_DISTANCE = Math.hypot(5, 15)
const HERO_CAMERA_POSITION: [number, number, number] = [
  HERO_DISTANCE * Math.sin(HERO_POLAR) * Math.sin(HERO_AZIMUTH),
  HERO_DISTANCE * Math.cos(HERO_POLAR),
  HERO_DISTANCE * Math.sin(HERO_POLAR) * Math.cos(HERO_AZIMUTH),
]
const HERO_DIRECTION = new THREE.Vector3(...HERO_CAMERA_POSITION)
  .sub(HERO_TARGET)
  .normalize()
const CAMERA_FOV = 55
const UP = new THREE.Vector3(0, 1, 0)

/** Progress at which the dolly starts and at which the screen is pixel-locked. */
const DOLLY_START = 0.0
const DOLLY_END = 0.95
/** Progress by which the idle drift has fully decayed. */
const DRIFT_END = 0.4

export type DollyDevice = "laptop" | "phone"

function Model({
  progressRef,
  screenRef,
  screen,
}: {
  progressRef: ProgressRef
  screenRef: RefObject<THREE.Mesh | null>
  screen?: THREE.Texture | null
}) {
  const group = useRef<THREE.Group>(null)
  const screenMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

  const { nodes, materials } = useGLTF(laptopModelUrl) as unknown as LaptopGLTF
  const maxAnisotropy = useThree((state) =>
    state.gl.capabilities.getMaxAnisotropy(),
  )
  const fallbackScreen = useTexture(laptopScreenImage)

  useEffect(() => {
    const material = screenMaterialRef.current
    if (!material) return

    /*
     * The live capture of the real panel wins: it is already cropped to the
     * screen's ratio, so it maps 1:1 and the release onto the page has no cut.
     */
    if (screen) {
      material.map = screen
      material.needsUpdate = true
      return
    }

    /* Until the capture lands, the shipping screenshot keeps the screen lit. */
    const texture = fallbackScreen.clone()
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.generateMipmaps = false
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.anisotropy = Math.min(16, maxAnisotropy)
    texture.repeat.set(1, 1)
    texture.offset.set(0, 0)
    texture.needsUpdate = true

    material.map = texture
    material.needsUpdate = true

    return () => {
      texture.dispose()
    }
  }, [maxAnisotropy, fallbackScreen, screen])

  useFrame((state) => {
    if (!group.current) return

    const drift = 1 - clamp01(progressRef.current / DRIFT_END)
    const t = state.clock.getElapsedTime()

    group.current.rotation.x = (Math.cos(t / 2) / 20 + 0.25) * drift
    group.current.rotation.y = (Math.sin(t / 4) / 20) * drift
    group.current.rotation.z = (Math.sin(t / 8) / 20) * drift
    group.current.position.y = ((Math.sin(t / 2) - 1) / 2) * drift
  })

  return (
    <group ref={group} dispose={null}>
      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes["Cube008"].geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={nodes["Cube008_1"].geometry}
          />
          <mesh ref={screenRef} geometry={nodes["Cube008_2"].geometry}>
            <meshBasicMaterial ref={screenMaterialRef} toneMapped={false} />
          </mesh>
        </group>
      </group>
      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={nodes.Cube002.geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={nodes.Cube002_1.geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={nodes.touchbar.geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  )
}

/**
 * Flies the camera from the hero framing to a head-on shot of the screen mesh,
 * derived from the mesh's live world transform so the final frame is exact
 * instead of hand-tuned.
 */
function CameraRig({
  progressRef,
  screenRef,
  heroFitRef,
  onScreenRect,
  track,
}: {
  progressRef: ProgressRef
  screenRef: RefObject<THREE.Mesh | null>
  heroFitRef?: RefObject<HeroFit>
  onScreenRect?: (rect: ScreenRect | null) => void
  /** Keep the aim on the screen for the whole move instead of easing onto it. */
  track?: boolean
}) {
  const camera = useThree((state) => state.camera as THREE.PerspectiveCamera)
  const size = useThree((state) => state.size)

  const scratch = useMemo(() => {
    const hero = new THREE.Vector3(...HERO_CAMERA_POSITION)
    const startQuat = new THREE.Quaternion()
    new THREE.Matrix4()
      .lookAt(hero, HERO_TARGET, UP)
      .decompose(new THREE.Vector3(), startQuat, new THREE.Vector3())

    return {
      center: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      toHero: new THREE.Vector3(),
      lookTarget: new THREE.Vector3(),
      worldCenter: new THREE.Vector3(),
      offset: new THREE.Vector3(),
      hero,
      startQuat,
      scale: new THREE.Vector3(),
      meshQuat: new THREE.Quaternion(),
      endQuat: new THREE.Quaternion(),
      arc: new THREE.Quaternion(),
      step: new THREE.Quaternion(),
      look: new THREE.Matrix4(),
      corner: new THREE.Vector3(),
      axisA: new THREE.Vector3(),
      axisB: new THREE.Vector3(),
    }
  }, [])

  useFrame(() => {
    const mesh = screenRef.current
    if (!mesh) return

    if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
    const box = mesh.geometry.boundingBox
    if (!box) return

    // Back off along the same sight line when the canvas is taller than the slot,
    // so the laptop keeps the size it has in the hero card.
    const fit = track
      ? phoneHeroScale(progressRef.current)
      : (heroFitRef?.current?.distanceScale ?? 1)
    scratch.hero.copy(HERO_TARGET).addScaledVector(HERO_DIRECTION, HERO_DISTANCE * fit)

    mesh.updateWorldMatrix(true, false)
    mesh.getWorldPosition(scratch.center)
    mesh.getWorldQuaternion(scratch.meshQuat)
    mesh.getWorldScale(scratch.scale)

    /*
     * The screen mesh is authored with its plane in local XZ, so the facing is
     * the thinnest bounding-box axis rather than +Z, and the panel's width and
     * height are the two extents that are left.
     */
    const extents = [
      ((box.max.x - box.min.x) / 2) * Math.abs(scratch.scale.x),
      ((box.max.y - box.min.y) / 2) * Math.abs(scratch.scale.y),
      ((box.max.z - box.min.z) / 2) * Math.abs(scratch.scale.z),
    ]
    let thin = 0
    if (extents[1] < extents[thin]) thin = 1
    if (extents[2] < extents[thin]) thin = 2
    const rest = [0, 1, 2].filter((axis) => axis !== thin)
    /*
     * Width is the in-plane axis that runs across the screen, not simply the
     * longer one: a laptop's screen is landscape but a phone's is portrait, and
     * fitting the taller extent to the viewport's width would shrink it to half.
     */
    const axisA = scratch.axisA
      .set(0, 0, 0)
      .setComponent(rest[0], 1)
      .applyQuaternion(scratch.meshQuat)
    const axisB = scratch.axisB
      .set(0, 0, 0)
      .setComponent(rest[1], 1)
      .applyQuaternion(scratch.meshQuat)
    const wide =
      Math.abs(axisA.dot(UP)) <= Math.abs(axisB.dot(UP)) ? rest[0] : rest[1]
    const tall = wide === rest[0] ? rest[1] : rest[0]
    const halfWidth = extents[wide]
    const halfHeight = extents[tall]

    /*
     * Aim at the panel's centre rather than the mesh origin: the bounding box is
     * asymmetric about the origin, which frames the plane off-centre and makes the
     * top anchor land short.
     */
    const localThin = (box.min.getComponent(thin) + box.max.getComponent(thin)) / 2
    scratch.worldCenter.set(0, 0, 0)
    for (const alongWide of [
      box.min.getComponent(wide),
      box.max.getComponent(wide),
    ]) {
      for (const alongTall of [
        box.min.getComponent(tall),
        box.max.getComponent(tall),
      ]) {
        scratch.corner
          .set(0, 0, 0)
          .setComponent(wide, alongWide)
          .setComponent(tall, alongTall)
          .setComponent(thin, localThin)
          .applyMatrix4(mesh.matrixWorld)
        scratch.worldCenter.add(scratch.corner)
      }
    }
    scratch.worldCenter.multiplyScalar(0.25)

    scratch.normal
      .set(0, 0, 0)
      .setComponent(thin, 1)
      .applyQuaternion(scratch.meshQuat)
      .normalize()
    scratch.toHero.copy(scratch.hero).sub(scratch.worldCenter)
    if (scratch.normal.dot(scratch.toHero) < 0) scratch.normal.negate()

    const tanY = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)
    /*
     * Fit the page's width: the screen has to land on the same column as the DOM
     * panel that replaces it, or the release jumps. The panel is laid out at the
     * viewport's own width, so the screen simply fills the viewport and the panel
     * continues below the fold.
     */
    const distance = (halfWidth * size.height) / (size.width * tanY)

    const raw = clamp01(progressRef.current)
    const blend = easeInOutCubic(
      track
        ? phoneDollyProgress(raw)
        : (raw - DOLLY_START) / (DOLLY_END - DOLLY_START),
    )

    /*
     * A straight position lerp cuts through the lid and keyboard on the way in,
     * so swing around the screen centre on a shrinking radius instead: the
     * camera arcs to face the panel and never crosses the model.
     */
    scratch.offset.copy(scratch.hero).sub(scratch.worldCenter)
    const heroDistance = scratch.offset.length()
    scratch.offset.normalize()
    scratch.arc.setFromUnitVectors(scratch.offset, scratch.normal)
    scratch.step.identity().slerp(scratch.arc, blend)
    scratch.offset.applyQuaternion(scratch.step)
    camera.position
      .copy(scratch.worldCenter)
      .addScaledVector(scratch.offset, lerp(heroDistance, distance, blend))

    /*
     * The panel is anchored to the top of the page, so the projected screen has
     * to be too: shift the projection by half the difference between its height
     * and the viewport's, in either direction. Above the column's width cap the
     * screen is shorter than the viewport, and without the upward shift its top
     * edge would sit below the fold instead of on it.
     */
    const projectedHeight = (halfHeight * size.height) / (distance * tanY)
    const shiftPx = ((projectedHeight - size.height) / 2) * blend
    if (Math.abs(shiftPx) > 0.01) {
      camera.setViewOffset(
        size.width,
        size.height,
        0,
        -shiftPx,
        size.width,
        size.height,
      )
    } else {
      camera.clearViewOffset()
    }
    scratch.lookTarget.copy(scratch.worldCenter)

    scratch.look.lookAt(camera.position, scratch.lookTarget, UP)
    scratch.endQuat.setFromRotationMatrix(scratch.look)
    camera.quaternion.slerpQuaternions(
      scratch.startQuat,
      scratch.endQuat,
      track ? 1 : blend,
    )

    /*
     * The DOM panel that takes over at the end of the pin is sized from these
     * projected corners, so the two agree by construction instead of by a
     * duplicated aspect ratio.
     */
    camera.updateMatrixWorld()
    let left = Infinity
    let top = Infinity
    let right = -Infinity
    let bottom = -Infinity
    for (const alongWide of [box.min.getComponent(wide), box.max.getComponent(wide)]) {
      for (const alongTall of [box.min.getComponent(tall), box.max.getComponent(tall)]) {
        scratch.corner
          .set(0, 0, 0)
          .setComponent(wide, alongWide)
          .setComponent(tall, alongTall)
          .setComponent(thin, localThin)
          .applyMatrix4(mesh.matrixWorld)
          .project(camera)
        const x = ((scratch.corner.x + 1) / 2) * size.width
        const y = ((1 - scratch.corner.y) / 2) * size.height
        left = Math.min(left, x)
        right = Math.max(right, x)
        top = Math.min(top, y)
        bottom = Math.max(bottom, y)
      }
    }
    onScreenRect?.({
      left,
      top,
      width: right - left,
      height: bottom - top,
    })

    if (import.meta.env.DEV) {
      ;(window as unknown as { __heroCamera: unknown }).__heroCamera = {
        blend,
        distance: +distance.toFixed(3),
        shiftPx: +shiftPx.toFixed(2),
        heroDistance: +heroDistance.toFixed(3),
        position: camera.position.toArray().map((v) => +v.toFixed(3)),
        rect: {
          left: +left.toFixed(1),
          top: +top.toFixed(1),
          width: +(right - left).toFixed(1),
          height: +(bottom - top).toFixed(1),
        },
      }
    }
  })

  return null
}

export default function LaptopScroll({
  progressRef,
  onScreenRect,
  heroFitRef,
  render,
  screenCanvas,
  screenKey,
  device = "laptop",
}: {
  progressRef: ProgressRef
  onScreenRect?: (rect: ScreenRect | null) => void
  heroFitRef?: RefObject<HeroFit>
  render: boolean
  screenCanvas?: HTMLCanvasElement | null
  screenKey?: string
  device?: DollyDevice
}) {
  const screenRef = useRef<THREE.Mesh>(null)
  const screen = useMemo(
    () => (screenCanvas ? screenTexture(screenCanvas, screenKey) : null),
    [screenCanvas, screenKey],
  )

  useEffect(() => {
    if (!screenCanvas) return
    releaseScreenTexturesExcept([
      HERO_PANEL_KEY,
      PHONE_PANEL_KEY,
      screenKey ?? "",
    ])
  }, [screenCanvas, screenKey])

  return (
    <Canvas
      camera={{
        position: HERO_CAMERA_POSITION,
        fov: CAMERA_FOV,
      }}
      /*
       * The screen is the page itself at the end of the dolly, so the canvas is
       * rendered at no less than twice the viewport — at 1× the lid's edges
       * stair-step and no texture can put that detail back. The shadow is baked
       * from one frame, which pays for the extra fill.
       */
      dpr={[SCREEN_MIN_DPR, SCREEN_MAX_DPR]}
      frameloop={render ? "always" : "demand"}
    >
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <ContactShadows
        position={[0, -4.5, 0]}
        scale={20}
        blur={2}
        far={4.5}
        opacity={1}
        frames={1}
      />
      <CameraRig
        progressRef={progressRef}
        screenRef={screenRef}
        heroFitRef={heroFitRef}
        onScreenRect={onScreenRect}
        track={device === "phone"}
      />
      {device === "phone" ? (
        <PhoneModel
          progressRef={progressRef}
          screenRef={screenRef}
          screen={screen}
        />
      ) : (
        <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
          <Model progressRef={progressRef} screenRef={screenRef} screen={screen} />
        </group>
      )}
      {/*
       * The environment is a remote HDRI; suspending it with the model would
       * hold the whole scene back until that download finishes. The fallback
       * keeps metal from reading as black in the meantime.
       */}
      <FallbackEnvironment />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
