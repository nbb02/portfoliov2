import { Link } from "react-router-dom"
import { FiExternalLink } from "react-icons/fi"
import HomeNav from "../components/home/HomeNav"

const LIBRARIES = [
  {
    name: "React & React DOM",
    note: "UI runtime",
    href: "https://react.dev/",
  },
  {
    name: "React Three Fiber",
    note: "React renderer for Three.js",
    href: "https://github.com/pmndrs/react-three-fiber",
  },
  {
    name: "Three.js",
    note: "3D rendering",
    href: "https://threejs.org/",
  },
  {
    name: "GSAP",
    note: "Scroll-driven animation",
    href: "https://greensock.com/gsap/",
  },
  {
    name: "Vite",
    note: "Build tooling",
    href: "https://vitejs.dev/",
  },
  {
    name: "Tailwind CSS",
    note: "Styling",
    href: "https://tailwindcss.com/",
  },
  {
    name: "TypeScript",
    note: "Type safety",
    href: "https://www.typescriptlang.org/",
  },
  {
    name: "React Router",
    note: "Routing",
    href: "https://reactrouter.com/",
  },
  {
    name: "react-icons",
    note: "Icon set",
    href: "https://react-icons.github.io/react-icons/",
  },
  {
    name: "Recharts",
    note: "Visitor dashboard charts",
    href: "https://recharts.org/",
  },
  {
    name: "Space Grotesk & Manrope",
    note: "Typefaces via Google Fonts",
    href: "https://fonts.google.com/",
  },
]

const MODELS = [
  {
    name: "Rubik's Cube",
    note: "Hero and v1 scene",
    source: "https://skfb.ly/opCGZ",
    license: "/assets/rubiks_cube/license.txt",
  },
  {
    name: "Sun",
    note: "Journey atmosphere",
    source: "https://skfb.ly/oy8RZ",
    license: "/assets/sun/sun/license.txt",
  },
  {
    name: "Moon",
    note: "Journey atmosphere",
    source: "https://skfb.ly/6TwGU",
    license: "/assets/moon/license.txt",
  },
]

export default function References() {
  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#11161D] antialiased">
      <HomeNav showExperience={false} />

      <main className="mx-auto max-w-[900px] px-5 pb-16 pt-8 sm:px-8">
        <header className="border-b border-slate-300 pb-6">
          <p className="text-sm font-semibold text-teal-700">Credits</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">
            Tools &amp; references.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            What this site is built with, and the sources for the 3D models and
            typefaces it uses.
          </p>
        </header>

        <section className="border-b border-slate-300 py-8">
          <h2 className="text-sm font-semibold text-teal-700">
            Libraries &amp; tools
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {LIBRARIES.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-3 rounded-xl border border-slate-300 bg-white/50 p-4 transition-colors hover:border-slate-400 hover:bg-white"
              >
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    {item.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-600">
                    {item.note}
                  </span>
                </span>
                <FiExternalLink
                  size={14}
                  className="mt-0.5 shrink-0 text-slate-400 transition-colors group-hover:text-teal-700"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </section>

        <section className="border-b border-slate-300 py-8">
          <h2 className="text-sm font-semibold text-teal-700">
            3D models &amp; assets
          </h2>
          <div className="mt-4 space-y-3">
            {MODELS.map((model) => (
              <div
                key={model.name}
                className="flex flex-col gap-3 rounded-xl border border-slate-300 bg-white/50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {model.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600">{model.note}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <a
                    href={model.source}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-600 underline-offset-4 transition-colors hover:text-teal-700 hover:underline"
                  >
                    Source
                  </a>
                  <a
                    href={model.license}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-600 underline-offset-4 transition-colors hover:text-teal-700 hover:underline"
                  >
                    License
                  </a>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-slate-300 bg-white/50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Laptop model (mac-draco.glb)
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Included locally at{" "}
                <span className="font-mono">
                  src/assets/laptop/mac-draco.glb
                </span>
                . See the{" "}
                <a
                  href="https://codesandbox.io/p/sandbox/9keg6"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-slate-700 underline-offset-4 hover:text-teal-700 hover:underline"
                >
                  reference usage
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-sm font-semibold text-teal-700">
            Licenses &amp; notes
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Model license files are served alongside their assets under{" "}
            <span className="font-mono text-slate-700">/assets/*/</span> and in{" "}
            <span className="font-mono text-slate-700">src/assets/*/</span>.
            Third-party libraries are used under the terms of their own
            licenses.
          </p>
        </section>

        <div className="flex items-center justify-between border-t border-slate-300 pt-6">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            ← Back to home
          </Link>
          <Link
            to="/projects"
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            Projects →
          </Link>
        </div>
      </main>
    </div>
  )
}
