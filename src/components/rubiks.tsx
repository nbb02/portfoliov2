import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Float, Environment } from "@react-three/drei"
import type { GLTF } from "three-stdlib"
import * as THREE from "three"
import { useInView } from "./useInView"
const modelUrl = "/assets/rubiks_cube/rubiks_cube/rubiks_cube.gltf"

export default function Rubiks() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapperRef, "50% 0px")
  /* Holding a context costs GPU memory even when it is not drawing, and the page
     has several; this one only has to exist near the hero, and it is built far
     enough ahead that the model is uploaded before the cube is on screen. */
  const near = useInView(wrapperRef, "250% 0px")

  function RubiksModel() {
    const gltf = useGLTF(modelUrl) as GLTF
    const { scene } = gltf
    const ref = useRef<THREE.Object3D>(null)

    const rotSpeed = { x: 0.2, y: 0.8, z: 0.15 }

    useFrame((_, delta) => {
      if (ref.current) {
        ref.current.rotation.x += delta * rotSpeed.x
        ref.current.rotation.y += delta * rotSpeed.y
        ref.current.rotation.z += delta * rotSpeed.z
      }
    })

    return <primitive ref={ref} object={scene} dispose={null} />
  }

  return (
    <div ref={wrapperRef} className="h-full w-full">
      {near && (
        <Canvas
          camera={{ position: [0, 40, 5], fov: 20 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
          frameloop={inView ? "always" : "never"}
        >
        <hemisphereLight args={[0xffffff, 0x444444, 0.45]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />

        <Suspense fallback={null}>
          <Float speed={1.05} rotationIntensity={0.4} floatIntensity={0.8}>
            <RubiksModel />
          </Float>
        </Suspense>
        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.6} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.1}
        />
        </Canvas>
      )}
    </div>
  )
}
