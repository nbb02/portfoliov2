import { useEffect } from "react"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"

let cached: THREE.CanvasTexture | null = null

/**
 * A neutral equirect painted synchronously, so glossy metal has something to
 * reflect in the frames before the remote HDRI resolves. Metals have almost no
 * diffuse response, so without an environment map a metalness-heavy model
 * renders as a black silhouette rather than an under-lit one.
 */
function fallbackEnvironment() {
  if (cached) return cached

  const canvas = document.createElement("canvas")
  canvas.width = 64
  canvas.height = 32
  const context = canvas.getContext("2d")

  if (context) {
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#e8eef5")
    gradient.addColorStop(0.55, "#8e9aa8")
    gradient.addColorStop(1, "#161a1f")
    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.mapping = THREE.EquirectangularReflectionMapping
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  cached = texture
  return texture
}

/**
 * Must be rendered inside a `<Canvas>`: it gives the scene something to reflect
 * until the real environment map is ready, then steps aside for it.
 */
export default function FallbackEnvironment() {
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    const previous = scene.environment
    // three.js objects are mutable by design; a hook result being one is fine.
    // eslint-disable-next-line react-hooks/immutability
    scene.environment = fallbackEnvironment()
    return () => {
      scene.environment = previous
    }
  }, [scene])

  return null
}
