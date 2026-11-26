import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.glb", "**/*.gltf"],
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        /*
         * The 3D stack and the scroll library are long-lived and only reachable
         * from lazy routes, so keeping them in named chunks stops a copy from
         * riding in the entry whenever an eager import touches them.
         */
        /*
         * Match by resolved path, not by package name: naming a package forces
         * its entry into the graph and defeats tree-shaking, which is what made
         * this chunk pull in all of drei instead of the parts the page imports.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return
          if (
            id.includes("/three/") ||
            id.includes("three-stdlib") ||
            id.includes("@react-three")
          ) {
            return "three"
          }
          if (id.includes("/gsap/")) return "gsap"
        },
      },
    },
  },
})
