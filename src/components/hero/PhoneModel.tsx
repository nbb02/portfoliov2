import { useEffect, useMemo, useRef } from "react"
import type { RefObject } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useTexture, RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import phoneModelUrl from "../../assets/phone/phone.glb"
import phoneBackImage from "../../assets/phone/back.png"
import { clamp01 } from "./easing"
import { phoneFront } from "./phoneTimeline"

/** Progress by which the idle drift has fully decayed. */
const DRIFT_END = 0.4

/* The approved mock's back is 440 × 1060 inside its 500 × 1120 phone. */
const MOCK_X = 30
const MOCK_Y = 30
const MOCK_W = 440
const MOCK_H = 1060
const TEX_W = 512
const TEX_H = 1233

const LASERS = [
  { x1: 280, y1: 452, x2: 378.57, y2: 590, color: "#ff2a2a", delay: 0 },
  { x1: 378.57, y1: 650, x2: 280, y2: 788, color: "#00f3ff", delay: 0.5 },
  { x1: 220, y1: 788, x2: 121.43, y2: 650, color: "#ffae00", delay: 1 },
  { x1: 121.43, y1: 590, x2: 220, y2: 452, color: "#39ff14", delay: 1.5 },
]

const LASER_CYCLE = 2
const LASER_WINDOW = 0.5
const TRACK_WIDTH = 12.5 * 1.3
const BEAM_WIDTH = 10 * 1.3
const CORE_WIDTH = 3.1 * 1.3

/*
 * The beams are a glow, not geometry: drawing them at half the skin's size
 * keeps the soft edges and quarters the bitmap this texture re-uploads while
 * the back is on screen.
 */
const LIGHT_SCALE = 0.5
const LIGHT_W = Math.round(TEX_W * LIGHT_SCALE)
const LIGHT_H = Math.round(TEX_H * LIGHT_SCALE)

const scaleX = TEX_W / MOCK_W
const scaleY = TEX_H / MOCK_H
const scale = (scaleX + scaleY) / 2

function roundedRectGeometry(width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2)
  const x = -width / 2
  const y = -height / 2
  const shape = new THREE.Shape()
  shape.moveTo(x + r, y)
  shape.lineTo(x + width - r, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + r)
  shape.lineTo(x + width, y + height - r)
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
  shape.lineTo(x + r, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - r)
  shape.lineTo(x, y + r)
  shape.quadraticCurveTo(x, y, x + r, y)
  return new THREE.ShapeGeometry(shape)
}

const CAMERA_TRIM_GEOMETRY = roundedRectGeometry(1.1, 1.8, 0.07)
const CAMERA_FACE_GEOMETRY = roundedRectGeometry(1.04, 1.74, 0.05)

const shadeCache = new Map<string, string>()

function shade(color: string, amount: number) {
  const key = `${color}:${amount}`
  const cached = shadeCache.get(key)
  if (cached) return cached
  const value = new THREE.Color(color).multiplyScalar(amount).getStyle()
  shadeCache.set(key, value)
  return value
}

function px(x: number) {
  return (x - MOCK_X) * scaleX
}

function py(y: number) {
  return (y - MOCK_Y) * scaleY
}

function drawTracks(context: CanvasRenderingContext2D) {
  context.save()
  context.strokeStyle = "#242933"
  context.lineWidth = TRACK_WIDTH * scale
  context.lineCap = "round"

  for (const laser of LASERS) {
    context.beginPath()
    context.moveTo(px(laser.x1), py(laser.y1))
    context.lineTo(px(laser.x2), py(laser.y2))
    context.stroke()
  }

  context.restore()
}

function clearBeams(context: CanvasRenderingContext2D) {
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, LIGHT_W, LIGHT_H)
}

function drawBeams(context: CanvasRenderingContext2D, time: number) {
  clearBeams(context)
  context.save()
  context.scale(LIGHT_SCALE, LIGHT_SCALE)
  context.globalCompositeOperation = "lighter"
  context.lineCap = "round"

  for (const laser of LASERS) {
    const t = (((time - laser.delay) % LASER_CYCLE) + LASER_CYCLE) % LASER_CYCLE
    if (t >= LASER_WINDOW) continue

    /* The mock's relay: a half-line dash enters at 0 and leaves at 25% of the
       cycle, so the next side starts as this one clears its end. */
    const offset = 50 - 150 * (t / LASER_WINDOW)
    const from = Math.max(0, -offset) / 100
    const to = Math.min(100, -offset + 50) / 100
    if (to - from <= 0.001) continue

    const x1 = px(laser.x1)
    const y1 = py(laser.y1)
    const x2 = px(laser.x2)
    const y2 = py(laser.y2)
    const ax = x1 + (x2 - x1) * from
    const ay = y1 + (y2 - y1) * from
    const bx = x1 + (x2 - x1) * to
    const by = y1 + (y2 - y1) * to

    const halo = shade(laser.color, 0.16)
    const glow = shade(laser.color, 0.42)

    context.strokeStyle = halo
    context.lineWidth = BEAM_WIDTH * scale * 2.6
    context.beginPath()
    context.moveTo(ax, ay)
    context.lineTo(bx, by)
    context.stroke()

    context.strokeStyle = glow
    context.lineWidth = BEAM_WIDTH * scale * 1.45
    context.beginPath()
    context.moveTo(ax, ay)
    context.lineTo(bx, by)
    context.stroke()

    context.strokeStyle = laser.color
    context.lineWidth = BEAM_WIDTH * scale
    context.beginPath()
    context.moveTo(ax, ay)
    context.lineTo(bx, by)
    context.stroke()

    context.strokeStyle = "#ffffff"
    context.lineWidth = CORE_WIDTH * scale
    context.beginPath()
    context.moveTo(ax, ay)
    context.lineTo(bx, by)
    context.stroke()
  }

  context.restore()
}

export default function PhoneModel({
  progressRef,
  screenRef,
  screen,
}: {
  progressRef: RefObject<number>
  screenRef: RefObject<THREE.Mesh | null>
  screen?: THREE.Texture | null
}) {
  const spinner = useRef<THREE.Group>(null)
  const lastPaint = useRef(0)
  const beamTime = useRef(0)
  const beamsOn = useRef(false)

  const { scene, nodes, materials } = useGLTF(phoneModelUrl)
  const backImage = useTexture(phoneBackImage)
  const screenMesh = nodes.screen as THREE.Mesh | undefined
  const backMesh = nodes["back-panel"] as THREE.Mesh | undefined

  const skin = useMemo(() => {
    const base = document.createElement("canvas")
    base.width = TEX_W
    base.height = TEX_H
    const baseContext = base.getContext("2d")
    const light = document.createElement("canvas")
    light.width = LIGHT_W
    light.height = LIGHT_H
    const lightContext = light.getContext("2d")
    if (!baseContext || !lightContext) {
      throw new Error("phone back: 2d canvas unavailable")
    }

    const baseTexture = new THREE.CanvasTexture(base)
    baseTexture.colorSpace = THREE.SRGBColorSpace
    baseTexture.anisotropy = 4
    baseTexture.needsUpdate = true

    const lightTexture = new THREE.CanvasTexture(light)
    lightTexture.colorSpace = THREE.SRGBColorSpace
    lightTexture.generateMipmaps = false
    lightTexture.minFilter = THREE.LinearFilter
    lightTexture.needsUpdate = true

    return { baseContext, baseTexture, lightContext, lightTexture }
  }, [])

  const backMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: skin.baseTexture,
        emissiveMap: skin.lightTexture,
        emissive: new THREE.Color("#ffffff"),
        emissiveIntensity: 1.2,
        roughness: 0.38,
        metalness: 0.32,
        clearcoat: 0.35,
        clearcoatRoughness: 0.35,
        envMapIntensity: 1.25,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      }),
    [skin],
  )

  useEffect(() => {
    const image = backImage.image
    if (!image) return
    skin.baseContext.drawImage(
      image as CanvasImageSource,
      0,
      0,
      TEX_W,
      TEX_H,
    )
    drawTracks(skin.baseContext)
    // three.js objects are mutable by design; a hook result being one is fine.
    // eslint-disable-next-line react-hooks/immutability
    skin.baseTexture.needsUpdate = true
  }, [backImage, skin])

  useEffect(() => {
    if (!backMesh) return

    const geometry = backMesh.geometry
    if (!geometry.getAttribute("uv")) {
      geometry.computeBoundingBox()
      const box = geometry.boundingBox
      if (!box) return
      const position = geometry.getAttribute("position")
      const uv = new Float32Array(position.count * 2)
      const width = box.max.x - box.min.x
      const height = box.max.y - box.min.y
      for (let i = 0; i < position.count; i++) {
        /* Mirror u: the texture is authored as seen from the back, and the
           back faces -Z, so the raw x mapping would put the camera on the
           wrong side. */
        uv[i * 2] = 1 - (position.getX(i) - box.min.x) / width
        uv[i * 2 + 1] = (position.getY(i) - box.min.y) / height
      }
      geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2))
    }

    const previous = backMesh.material
    const z = backMesh.position.z
    // three.js objects are mutable by design; a hook result being one is fine.
    // eslint-disable-next-line react-hooks/immutability
    backMesh.material = backMaterial
    /* The body's back face is coplanar with the inset panel; without a nudge
       the two fight for the same depth and shimmer while the phone drifts. */
    // eslint-disable-next-line react-hooks/immutability
    backMesh.position.z = z - 0.0015

    return () => {
      backMesh.material = previous
      backMesh.position.z = z
    }
  }, [backMesh, backMaterial])

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

  useEffect(() => {
    /* The approved back already carries the camera, so every lens in the model
       must stay hidden or it doubles at the top-right. */
    scene.traverse((object) => {
      if (/lens|camera-island/i.test(object.name)) {
        object.visible = false
      }
    })

    const frame = materials.frame as THREE.MeshStandardMaterial | undefined
    if (frame) {
      frame.color.set("#2b2e33")
      // eslint-disable-next-line react-hooks/immutability
      frame.metalness = 0.72
      frame.roughness = 0.34
    }
  }, [materials, scene])

  useEffect(() => {
    return () => {
      backMaterial.dispose()
      skin.baseTexture.dispose()
      skin.lightTexture.dispose()
    }
  }, [backMaterial, skin])

  useFrame((state, delta) => {
    const progress = progressRef.current
    const front = phoneFront(progress)
    const drift = 1 - clamp01(progress / DRIFT_END)
    const t = state.clock.getElapsedTime()
    const turn = Math.sin(Math.PI * front)

    if (spinner.current) {
      spinner.current.rotation.y =
        Math.PI * front + (Math.sin(t / 4) / 22) * drift * (1 - front)
      spinner.current.rotation.x =
        (Math.cos(t / 2) / 26 + 0.1) * drift + turn * 0.06
      spinner.current.rotation.z =
        (Math.sin(t / 8) / 26) * drift - turn * 0.03
      spinner.current.position.y =
        ((Math.sin(t / 2) - 1) / 2) * 0.6 * drift
    }

    /* The back is only on screen before the turn is over. */
    if (progress > 0.26) {
      if (beamsOn.current) {
        beamsOn.current = false
        clearBeams(skin.lightContext)
        // three.js objects are mutable by design; a hook result being one is fine.
        // eslint-disable-next-line react-hooks/immutability
        skin.lightTexture.needsUpdate = true
      }
      return
    }

    /*
     * Drawn time, not the wall clock. The canvas stops rendering when it leaves
     * the viewport, so a clock read from `getElapsedTime()` hands the first
     * visible frame a phase from whenever it last ran — and a delta covering
     * the whole pause. Starting at zero on each pass is what makes the relay
     * read as a relay instead of picking up mid-sweep.
     */
    if (!beamsOn.current) {
      beamsOn.current = true
      beamTime.current = 0
      lastPaint.current = -1
    }

    beamTime.current += Math.min(delta, 1 / 15)
    if (beamTime.current - lastPaint.current < 1 / 30) return
    lastPaint.current = beamTime.current

    drawBeams(skin.lightContext, beamTime.current)
    // three.js objects are mutable by design; a hook result being one is fine.
    // eslint-disable-next-line react-hooks/immutability
    skin.lightTexture.needsUpdate = true
  })

  return (
    <>
      <directionalLight position={[-6, 6, -10]} intensity={2.4} color="#eef4ff" />
      <directionalLight position={[6, 2, -8]} intensity={1.2} color="#8fd8ff" />
      <group ref={spinner}>
        <primitive object={scene} dispose={null} />
        <group position={[1.03, 2.78, -0.5115]}>
          <RoundedBox args={[1.16, 1.86, 0.18]} radius={0.09} smoothness={4}>
            <meshPhysicalMaterial
              color="#11151c"
              metalness={0.72}
              roughness={0.34}
              clearcoat={0.3}
              clearcoatRoughness={0.3}
            />
          </RoundedBox>
          <mesh geometry={CAMERA_TRIM_GEOMETRY} position={[0, 0, -0.093]}>
            <meshStandardMaterial
              color="#e62222"
              emissive="#e62222"
              emissiveIntensity={0.45}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh geometry={CAMERA_FACE_GEOMETRY} position={[0, 0, -0.097]}>
            <meshPhysicalMaterial
              color="#080b10"
              metalness={0.5}
              roughness={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
          {[0.43, -0.43].map((y) => (
            <group key={y} position={[0, y, -0.11]}>
              <mesh rotation-x={Math.PI / 2}>
                <cylinderGeometry args={[0.3, 0.3, 0.04, 32]} />
                <meshStandardMaterial
                  color="#39424f"
                  metalness={0.85}
                  roughness={0.28}
                />
              </mesh>
              <mesh position={[0, 0, -0.012]} rotation-x={Math.PI / 2}>
                <cylinderGeometry args={[0.255, 0.255, 0.018, 32]} />
                <meshPhysicalMaterial
                  color="#050a12"
                  metalness={0.55}
                  roughness={0.08}
                  clearcoat={0.8}
                />
              </mesh>
              <mesh position={[0, 0, -0.021]} rotation-x={Math.PI / 2}>
                <cylinderGeometry args={[0.125, 0.125, 0.01, 24]} />
                <meshStandardMaterial color="#010204" roughness={0.4} />
              </mesh>
              <mesh position={[-0.07, 0.06, -0.03]}>
                <sphereGeometry args={[0.032, 12, 12]} />
                <meshBasicMaterial color="#e7fbff" toneMapped={false} />
              </mesh>
            </group>
          ))}
          <mesh position={[0, 0, -0.108]}>
            <boxGeometry args={[0.22, 0.12, 0.018]} />
            <meshStandardMaterial
              color="#f2e7cc"
              emissive="#fff1c9"
              emissiveIntensity={0.35}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>
    </>
  )
}

useGLTF.preload(phoneModelUrl)
