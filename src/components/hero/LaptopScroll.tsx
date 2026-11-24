import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Environment,
  useGLTF,
  useTexture,
  ContactShadows,
} from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"
import type { RefObject } from "react"
import type { GLTF } from "three-stdlib"
import laptopModelUrl from "../../assets/laptop/mac-draco.glb"
import laptopScreenImage from "../../assets/hero/screen-panel.jpg"
import { clamp01, easeInOutCubic, lerp } from "./easing"
import { SCREEN_FILL } from "./screenGeometry"

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

function Model({
  progressRef,
  screenRef,
}: {
  progressRef: ProgressRef
  screenRef: RefObject<THREE.Mesh | null>
}) {
  const group = useRef<THREE.Group>(null)
  const screenMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

  const { nodes, materials } = useGLTF(laptopModelUrl) as unknown as LaptopGLTF
  const maxAnisotropy = useThree((state) =>
    state.gl.capabilities.getMaxAnisotropy(),
  )
  const screenTexture = useTexture(laptopScreenImage)

  useEffect(() => {
    const material = screenMaterialRef.current
    if (!material) return

    const texture = screenTexture.clone()
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.generateMipmaps = false
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.anisotropy = Math.min(16, maxAnisotropy)
    /**
     * The capture is the panel rendered at the screen mesh's own 1.544 ratio, so it
     * maps 1:1 and the crossfade to the DOM panel has no visible cut.
     */
    texture.repeat.set(1, 1)
    texture.offset.set(0, 0)
    texture.needsUpdate = true

    material.map = texture
    material.needsUpdate = true

    return () => {
      texture.dispose()
    }
  }, [maxAnisotropy, screenTexture])

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
}: {
  progressRef: ProgressRef
  screenRef: RefObject<THREE.Mesh | null>
  heroFitRef?: RefObject<HeroFit>
  onScreenRect?: (rect: ScreenRect | null) => void
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
    const fit = heroFitRef?.current?.distanceScale ?? 1
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
    const wide = extents[rest[0]] >= extents[rest[1]] ? rest[0] : rest[1]
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
    const aspect = size.width / Math.max(1, size.height)
    /*
     * Cover, not fit: the screen has to swallow the whole viewport so the lid and
     * keyboard are gone by the end, even though that crops a few percent of the
     * panel's height.
     */
    const distance = Math.min(
      halfWidth / (SCREEN_FILL * tanY * aspect),
      halfHeight / (SCREEN_FILL * tanY),
    )

    const blend = easeInOutCubic(
      (clamp01(progressRef.current) - DOLLY_START) / (DOLLY_END - DOLLY_START),
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
     * Covering the viewport crops the panel top and bottom equally, which clips the
     * header. Anchor the screen's top edge to the viewport top instead and let the
     * excess run past the bottom — a pure projection-window shift, so the plane stays
     * square to the lens and the image keeps its exact size.
     */
    const projectedHeight = (halfHeight * size.height) / (distance * tanY)
    const overflow = Math.max(0, projectedHeight - size.height)
    const shiftPx = (overflow / 2) * blend
    if (shiftPx > 0.01) {
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
      blend,
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
        overflow: +overflow.toFixed(2),
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
}: {
  progressRef: ProgressRef
  onScreenRect?: (rect: ScreenRect | null) => void
  heroFitRef?: RefObject<HeroFit>
  render: boolean
}) {
  const screenRef = useRef<THREE.Mesh>(null)

  return (
    <Canvas
      camera={{
        position: HERO_CAMERA_POSITION,
        fov: CAMERA_FOV,
      }}
      dpr={[1, 1.5]}
      frameloop={render ? "always" : "demand"}
    >
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <ContactShadows
        position={[0, -4.5, 0]}
        scale={20}
        blur={2}
        far={4.5}
        opacity={1}
      />
      <CameraRig
        progressRef={progressRef}
        screenRef={screenRef}
        heroFitRef={heroFitRef}
        onScreenRect={onScreenRect}
      />
      <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
        <Model progressRef={progressRef} screenRef={screenRef} />
      </group>
      <Environment preset="city" />
    </Canvas>
  )
}
