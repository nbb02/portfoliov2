import { useEffect, useRef } from "react"
import type { RefObject } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import phoneModelUrl from "../../assets/phone/phone.glb"
import { clamp01 } from "./easing"

/** Progress by which the idle drift has fully decayed. */
const DRIFT_END = 0.4

/**
 * The phone that stands in for the laptop on narrow viewports. Its screen is
 * 0.46:1, which is the viewport's own ratio once the screen fills the width, so
 * the dolly can hand over to the page the way the laptop does instead of growing
 * a window out of a screen that cannot reach the edges.
 */
export default function PhoneModel({
  progressRef,
  screenRef,
  screen,
}: {
  progressRef: RefObject<number>
  screenRef: RefObject<THREE.Mesh | null>
  screen?: THREE.Texture | null
}) {
  const group = useRef<THREE.Group>(null)
  const { scene, nodes } = useGLTF(phoneModelUrl)

  const screenMesh = nodes.screen as THREE.Mesh | undefined

  useEffect(() => {
    if (!screenMesh) return
    screenRef.current = screenMesh
    return () => {
      screenRef.current = null
    }
  }, [screenMesh, screenRef])

  useEffect(() => {
    if (!screenMesh) return

    /* The live panel replaces whatever the model shipped with, so the screen
       always shows the page rather than a baked image of it. */
    const material = new THREE.MeshBasicMaterial({
      map: screen ?? null,
      color: screen ? "#ffffff" : "#05070A",
      toneMapped: false,
    })
    // three.js objects are mutable by design; a hook result being one is fine.
    // eslint-disable-next-line react-hooks/immutability
    screenMesh.material = material

    return () => {
      material.dispose()
    }
  }, [screenMesh, screen])

  useFrame((state) => {
    if (!group.current) return

    const drift = 1 - clamp01(progressRef.current / DRIFT_END)
    const t = state.clock.getElapsedTime()

    group.current.rotation.x = (Math.cos(t / 2) / 26 + 0.1) * drift
    /* Half a turn: the model faces +Z, the hero camera sits on the other side. */
    group.current.rotation.y = Math.PI + (Math.sin(t / 4) / 22) * drift
    group.current.rotation.z = (Math.sin(t / 8) / 26) * drift
    group.current.position.y = ((Math.sin(t / 2) - 1) / 2) * 0.6 * drift
  })

  return (
    <group ref={group}>
      <primitive object={scene} dispose={null} />
    </group>
  )
}

useGLTF.preload(phoneModelUrl)
