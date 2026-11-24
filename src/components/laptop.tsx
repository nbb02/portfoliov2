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
import { useNavigate } from "react-router-dom"
import type { GLTF } from "three-stdlib"
import laptopModelUrl from "../assets/laptop/mac-draco.glb"
import fallbackScreenUrl from "../assets/hero/screen-panel.jpg"
import { TbHandClick } from "react-icons/tb"
import { useInView } from "./useInView"
import GithubPanel from "./hero/GithubPanel"
import {
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

function Model({
  onScreenClick,
  screen,
}: {
  onScreenClick?: () => void
  screen: THREE.Texture | null
}) {
  const group = useRef<THREE.Group>(null)
  const screenScrollRef = useRef(0)
  const maxTextureOffsetRef = useRef(0)
  const isScreenHoveredRef = useRef(false)
  const screenMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

  const { nodes, materials } = useGLTF(laptopModelUrl) as unknown as LaptopGLTF
  const maxAnisotropy = useThree((state) =>
    state.gl.capabilities.getMaxAnisotropy(),
  )

  const screenAspect = useMemo(() => {
    const geometry = nodes["Cube008_2"].geometry
    geometry.computeBoundingBox()
    const size = geometry.boundingBox?.getSize(new THREE.Vector3())
    return size && size.z > 0 ? size.x / size.z : 1.6
  }, [nodes])

  useEffect(() => {
    const material = screenMaterialRef.current
    if (!material || !screen) {
      return
    }

    const maxOffset = fitScreenMap(screen, screenAspect, maxAnisotropy)
    if (maxOffset === null) {
      return
    }

    // Start from the top of the page.
    maxTextureOffsetRef.current = maxOffset
    screenScrollRef.current = 0
    material.needsUpdate = true
  }, [maxAnisotropy, screen, screenAspect])

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
            geometry={nodes["Cube008_2"].geometry}
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
      <Html
        position={[0, 2.6, 0]}
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
  const wrapperRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapperRef, "50% 0px")
  /* The context costs GPU memory whether or not it is drawing, and this one is
     only ever needed around the hero; the dolly has its own. */
  const near = useInView(wrapperRef, "150% 0px")
  const [screen, setScreen] = useState<THREE.Texture | null>(
    cachedScreenTexture,
  )
  const [captureHost, setCaptureHost] = useState(!screen)

  /*
   * The panel is mounted out of sight only long enough to be rasterised. That
   * keeps the screen in step with `githubProfile` without anyone having to
   * retake a screenshot of the profile page.
   */
  useEffect(() => {
    if (screen) {
      setCaptureHost(false)
      return
    }

    const node = hostRef.current
    if (!node) {
      return
    }

    let cancelled = false
    const run = async () => {
      try {
        const canvas = await capturePanel(node)
        if (!cancelled) {
          setScreen(screenTexture(canvas))
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
  }, [screen])

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
            width: SCREEN_PANEL_WIDTH,
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
          dpr={[1, 2]}
          frameloop={inView ? "always" : "demand"}
        >
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Suspense fallback={null}>
            <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
              <Model screen={screen} onScreenClick={() => navigateToDesktop()} />
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
