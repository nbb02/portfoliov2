import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Environment,
  useGLTF,
  ContactShadows,
  OrbitControls,
  Html,
} from "@react-three/drei"
import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import type { RefObject } from "react"
import { useNavigate } from "react-router-dom"
import type { GLTF, OrbitControls as OrbitControlsImpl } from "three-stdlib"
import laptopModelUrl from "../assets/laptop/mac-draco.glb"
import fallbackScreenUrl from "../assets/hero/screen-panel.jpg"
import { TbHandClick } from "react-icons/tb"
import { useInView } from "./useInView"
import { useMediaQuery } from "./useMediaQuery"
import GithubPanel from "./hero/GithubPanel"
import {
  HERO_PANEL_KEY,
  HERO_PANEL_WIDTH,
  PHONE_PANEL_KEY,
  PHONE_PANEL_WIDTH,
  SCREEN_PANEL_WIDTH,
  cachedScreenTexture,
  capturePanel,
  fitScreenMap,
  screenTexture,
} from "./hero/panelCapture"

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

const PROJECTED = new THREE.Vector3()

function Model({
  onScreenClick,
  screen,
  controlsRef,
}: {
  onScreenClick?: () => void
  screen: THREE.Texture | null
  controlsRef: RefObject<OrbitControlsImpl | null>
}) {
  const group = useRef<THREE.Group>(null)
  const screenMeshRef = useRef<THREE.Mesh>(null)
  const screenScrollRef = useRef(0)
  const maxTextureOffsetRef = useRef(0)
  const screenHeightRef = useRef(0)
  const dragRef = useRef<{ y: number } | null>(null)
  const isScreenHoveredRef = useRef(false)
  const screenMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

  const { nodes, materials } = useGLTF(laptopModelUrl) as unknown as LaptopGLTF
  const maxAnisotropy = useThree((state) =>
    state.gl.capabilities.getMaxAnisotropy(),
  )

  const screenGeometry = useMemo(() => {
    const geometry = nodes["Cube008_2"].geometry
    geometry.computeBoundingBox()
    const box = geometry.boundingBox
    const size = box?.getSize(new THREE.Vector3())
    return {
      box,
      aspect: size && size.z > 0 ? size.x / size.z : 1.6,
    }
  }, [nodes])

  useEffect(() => {
    const material = screenMaterialRef.current
    if (!material || !screen) {
      return
    }

    /*
     * Trilinear filtering blends two mip levels and smears small UI text on the
     * tilted lid. Bilinear filtering within one level keeps the page sharp while
     * the mipmaps and anisotropy still stop it shimmering at a glancing angle.
     */
    const maxOffset = fitScreenMap(
      screen,
      screenGeometry.aspect,
      maxAnisotropy,
      THREE.LinearMipmapNearestFilter,
    )
    if (maxOffset === null) {
      return
    }

    // Start from the top of the page.
    maxTextureOffsetRef.current = maxOffset
    screenScrollRef.current = 0
    material.needsUpdate = true
  }, [maxAnisotropy, screen, screenGeometry])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!isScreenHoveredRef.current) {
        return
      }

      event.preventDefault()

      if (maxTextureOffsetRef.current <= 0) {
        return
      }

      screenScrollRef.current = THREE.MathUtils.clamp(
        screenScrollRef.current + event.deltaY * 0.0006,
        0,
        maxTextureOffsetRef.current,
      )

      if (screen) {
        screen.offset.y = screenScrollRef.current
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", onWheel)
    }
  }, [screen])

  /*
   * The screen is the only part of the card that scrolls, so a touch drag on
   * it moves the page inside the lid rather than rotating the model or the
   * page behind it. The drag is tracked on the window so it keeps working when
   * the finger leaves the screen.
   */
  useEffect(() => {
    if (onScreenClick) return

    const controls = controlsRef.current
    const scroll = (dy: number) => {
      const max = maxTextureOffsetRef.current
      const height = screenHeightRef.current
      if (!screen || !dy || max <= 0 || height <= 1) return

      /*
       * `1 - max` is the slice of the page the screen shows, so a pixel of drag
       * advances the page by that slice over the screen's own height — the
       * content tracks the finger instead of jumping a fixed amount.
       */
      screenScrollRef.current = THREE.MathUtils.clamp(
        screenScrollRef.current - dy * ((1 - max) / height),
        0,
        max,
      )
      screen.offset.y = screenScrollRef.current
    }

    const onMove = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      const dy = event.clientY - drag.y
      drag.y = event.clientY
      scroll(dy)
    }

    const end = () => {
      if (!dragRef.current) return
      dragRef.current = null
      if (controlsRef.current) controlsRef.current.enabled = true
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", end)
    window.addEventListener("pointercancel", end)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", end)
      window.removeEventListener("pointercancel", end)
      if (controls) controls.enabled = true
    }
  }, [controlsRef, onScreenClick, screen])

  useFrame((state) => {
    if (!group.current) {
      return
    }

    const t = state.clock.getElapsedTime()

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.cos(t / 2) / 20 + 0.25,
      0.1,
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t / 4) / 20,
      0.1,
    )
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      Math.sin(t / 8) / 20,
      0.1,
    )
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      (-2 + Math.sin(t / 2)) / 2,
      0.1,
    )

    /*
     * How many CSS pixels tall the lid is drawn, so a drag can be converted to
     * page movement. Projected from the same transforms that were just set.
     */
    if (onScreenClick) return
    const mesh = screenMeshRef.current
    const box = screenGeometry.box
    if (!mesh || !box) return

    mesh.updateWorldMatrix(true, false)
    let top = Infinity
    let bottom = -Infinity
    for (const x of [box.min.x, box.max.x]) {
      for (const y of [box.min.y, box.max.y]) {
        for (const z of [box.min.z, box.max.z]) {
          PROJECTED.set(x, y, z)
            .applyMatrix4(mesh.matrixWorld)
            .project(state.camera)
          const py = ((1 - PROJECTED.y) / 2) * state.size.height
          top = Math.min(top, py)
          bottom = Math.max(bottom, py)
        }
      }
    }
    screenHeightRef.current = bottom - top
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
          <mesh
            ref={screenMeshRef}
            geometry={nodes["Cube008_2"].geometry}
            onPointerDown={(event) => {
              if (onScreenClick) return
              dragRef.current = { y: event.clientY }
              if (controlsRef.current) controlsRef.current.enabled = false
            }}
            onPointerOver={(event) => {
              event.stopPropagation()
              isScreenHoveredRef.current = true
            }}
            onPointerOut={() => {
              isScreenHoveredRef.current = false
            }}
            onClick={(event) => {
              event.stopPropagation()
              if (onScreenClick) onScreenClick()
            }}
          >
            <meshBasicMaterial
              ref={screenMaterialRef}
              map={screen ?? undefined}
              color={screen ? "#ffffff" : "#05070A"}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
      {onScreenClick && (
        <Html
          position={[0, 0.4, 3.4]}
          transform
          occlude={false}
          style={{ pointerEvents: "none", width: "160px", textAlign: "center" }}
          center
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 9999,
                background: "rgba(0,0,0,0.65)",
                color: "white",
                fontSize: 13,
                opacity: 0.95,
                animation: "fadeBlink 1.6s ease-in-out infinite",
              }}
            >
              <TbHandClick size={30} />
            </div>
          </div>
          <style>{`@keyframes fadeBlink{0%{opacity:0}30%{opacity:0.95}70%{opacity:0.6}100%{opacity:0}}`}</style>
        </Html>
      )}
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

useGLTF.preload(laptopModelUrl)

export default function Laptop() {
  const navigate = useNavigate()
  const navigateToDesktop = () => navigate("/desktop")
  /*
   * The screen routes to the desktop page, which has no touch layout, so below
   * the two-column breakpoint the laptop stays decorative: no click target and
   * no blinking hand inviting one.
   */
  const desktop = useMediaQuery("(min-width: 1024px)")
  /*
   * The lid is drawn much smaller on a phone, so its page is captured
   * narrower instead of squeezed.
   */
  const phone = useMediaQuery("(max-width: 639px)")
  const panelWidth = phone ? PHONE_PANEL_WIDTH : HERO_PANEL_WIDTH
  const panelKey = phone ? PHONE_PANEL_KEY : HERO_PANEL_KEY
  const wrapperRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const inView = useInView(wrapperRef, "50% 0px")
  /* The context costs GPU memory whether or not it is drawing, and this one is
     only ever needed around the hero; the dolly has its own. */
  const near = useInView(wrapperRef, "150% 0px")
  const [screen, setScreen] = useState<THREE.Texture | null>(() =>
    cachedScreenTexture(panelKey) ?? cachedScreenTexture(SCREEN_PANEL_WIDTH),
  )
  const [captureHost, setCaptureHost] = useState(false)

  /* Show the cached capture for this layout straight away when there is one. */
  useEffect(() => {
    const cached = cachedScreenTexture(panelKey)
    if (cached) {
      setScreen(cached)
      setCaptureHost(false)
      return
    }
    setCaptureHost(true)
  }, [panelKey])

  /*
   * The panel is mounted out of sight only long enough to be rasterised. That
   * keeps the screen in step with `githubProfile` without anyone having to
   * retake a screenshot of the profile page.
   */
  useEffect(() => {
    if (!captureHost) {
      return
    }

    const node = hostRef.current
    if (!node) {
      return
    }

    let cancelled = false
    const run = async () => {
      try {
        /*
         * The page is captured at twice the width the screen is drawn, and the
         * quad is tilted, so rasterising at the display's own DPR still leaves a
         * 1× desktop with a 660 px source. Supersample the capture itself instead:
         * the screen keeps detail without supersampling the whole GPU context.
         */
        const canvas = await capturePanel(node, panelWidth, {
          pixelRatio: 2,
          key: panelKey,
        })
        if (!cancelled) {
          setScreen(screenTexture(canvas, panelKey))
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("[laptop] screen capture failed", error)
        }
        // Better a still of the panel than a blank laptop.
        if (!cancelled) {
          setScreen(
            new THREE.TextureLoader().load(fallbackScreenUrl, (texture) => {
              texture.colorSpace = THREE.SRGBColorSpace
              texture.needsUpdate = true
            }),
          )
        }
      } finally {
        if (!cancelled) {
          setCaptureHost(false)
        }
      }
    }

    const idle = window.requestIdleCallback(run, { timeout: 2000 })

    return () => {
      cancelled = true
      window.cancelIdleCallback(idle)
    }
  }, [captureHost, panelKey, panelWidth])

  return (
    <div ref={wrapperRef} className="h-full w-full">
      {captureHost && (
        <div
          ref={hostRef}
          aria-hidden="true"
          inert
          style={{
            position: "fixed",
            top: 0,
            left: -SCREEN_PANEL_WIDTH - 2000,
            width: panelWidth,
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          <GithubPanel />
        </div>
      )}
      {near && (
        <Canvas
          camera={{ position: [-5, 0, -15], fov: 55 }}
          dpr={[2, 3]}
          frameloop={inView ? "always" : "demand"}
        >
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Suspense fallback={null}>
            <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
              <Model
                screen={screen}
                controlsRef={controlsRef}
                onScreenClick={desktop ? navigateToDesktop : undefined}
              />
            </group>
            <Environment preset="city" />
          </Suspense>
          <ContactShadows
            position={[0, -4.5, 0]}
            scale={20}
            blur={2}
            far={4.5}
            frames={1}
          />
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
      )}
    </div>
  )
}
