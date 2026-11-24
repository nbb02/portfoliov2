const image = (name: string) => `/assets/projects/virtual-office/${name}`

export type Stat = {
  value: string
  unit: string
  label: string
}

export type Scene = {
  id: string
  name: string
  index: string
  kicker: string
  title: string
  body: string
  facts: Array<[string, string]>
  modes: Array<{ id: string; label: string; src: string }>
  hotspots: Array<{ x: number; y: number; title: string; body: string }>
}

export const project = {
  name: "Virtual Spaces",
  year: "2026",
  label: "Case study · local-first developer tool",
  title: "A 3D office that shows what your coding agents are doing.",
  titleParts: ["A 3D office that shows what your ", "coding agents", " are doing."],
  lede: "Virtual Spaces reads the logs, databases and process table that local agent tools leave behind, then turns them into a place you can watch. Agents claim desks, quiet tools sleep in recharge pods, dev servers start from inside the scene. Nothing leaves the machine.",
  meta: [
    { label: "Role", value: "Design, frontend, local backend — solo" },
    {
      label: "Stack",
      value: "React 18 · React Three Fiber · three.js · Vite · Tauri 2",
    },
    { label: "Runtime", value: "Node 20 on 127.0.0.1 · no accounts, no cloud" },
    { label: "Year", value: "2026" },
  ],
}

export const hero = {
  shots: { day: image("day.webp"), clean: image("clean.webp") },
  caption:
    "Office, day. Every character on the floor is an agent OpenCode reported in the last 24 hours.",
  cleanCaption:
    "Clean view (H). Same scene, every overlay hidden — how the screenshots are taken.",
}

export const stats: Stat[] = [
  { value: "10.3k", unit: "lines", label: "of React across 53 modules" },
  {
    value: "5",
    unit: "bridges",
    label: "local HTTP plugins, zero services to install",
  },
  {
    value: "60",
    unit: "nodes",
    label: "hand-authored walk graph, no physics engine",
  },
  { value: "0", unit: "calls", label: "outbound network requests at runtime" },
]

export const story = {
  label: "01 — Why",
  title: "Agent tools are powerful and completely invisible.",
  body: "When you run a coding agent, the interesting part is hidden: which session is busy, which one is waiting on you, what is actually running on this machine. That state already sits in log files, a database and a process table, so the app reads it locally and turns it into a room you can glance at.",
  chips: ["Local only", "Windows first", "No new dependencies", "No telemetry"],
}

export const scenes: Scene[] = [
  {
    id: "office",
    name: "Office",
    index: "01",
    kicker: "The floor plan",
    title: "Nine rooms from one module",
    body: "The plate outline, walls, doors, desk rows and walk graph all live in officeFloorplan.js. Nothing else in the scene is allowed to declare a wall.",
    facts: [
      ["Rooms", "9"],
      ["Claimable seats", "17"],
      ["Walk nodes", "60"],
    ],
    modes: [
      { id: "day", label: "Day", src: image("day.webp") },
      { id: "night", label: "Night", src: image("night.webp") },
      { id: "clean", label: "Clean", src: image("clean.webp") },
    ],
    hotspots: [
      {
        x: 37,
        y: 44,
        title: "Six claimable desks",
        body: "Every cubicle renders whether or not it has an owner. The chair is tucked and the monitor dark until an agent claims the seat.",
      },
      {
        x: 50,
        y: 52,
        title: "The espresso bar",
        body: "An idle agent walks to the break room instead of standing at an empty desk. Presence means activity, not just an open window.",
      },
      {
        x: 81,
        y: 52,
        title: "Terrace court",
        body: "Three synthetic visitors play tennis here. They hold no seat, never reach the bridge and are not claimable.",
      },
      {
        x: 19,
        y: 46,
        title: "Walls that drop",
        body: "An outer wall whose outside face points at the camera collapses to a 0.14 m kerb, so the default view sees into every room. Internal walls never cut.",
      },
      {
        x: 15,
        y: 88,
        title: "Activity log",
        body: "Scene changes, tool transitions and bridge events, newest first — the same facts the room is built from, in text.",
      },
    ],
  },
  {
    id: "tools",
    name: "Tools Wing",
    index: "02",
    kicker: "Live status",
    title: "One bay per tool, lit only when it works",
    body: "Bays come from config, so the default trio is hand-placed and a fourth tool simply gets a fourth bay. The medallion is the status; the operator is the presence.",
    facts: [
      ["Bays", "1 per tool"],
      ["Statuses", "7"],
      ["Poll", "2 s"],
    ],
    modes: [{ id: "day", label: "Day", src: image("tools-wing.webp") }],
    hotspots: [
      {
        x: 13,
        y: 56,
        title: "Recharge pods",
        body: "A tool that is idle or closed sleeps here. Its pod stays occupied until the process comes back, so absence is legible.",
      },
      {
        x: 66,
        y: 61,
        title: "A working bay",
        body: "Lights, arc and operator appear only while the tool is actually working. A leftover console cannot fake it.",
      },
      {
        x: 66,
        y: 39,
        title: "Status medallion",
        body: "One of seven states: running, waiting, recent, idle, closed, unknown, offline. Each has its own colour and label.",
      },
      {
        x: 53,
        y: 48,
        title: "A closed bay",
        body: "Codex reads as closed because no Codex process is running — not because its logs are old.",
      },
      {
        x: 65,
        y: 16,
        title: "Live status board",
        body: "Fed by a two-second poll that stops entirely while the tab is hidden. No client attached means no collection at all.",
      },
    ],
  },
  {
    id: "farm",
    name: "Farm",
    index: "03",
    kicker: "Same engine, new world",
    title: "Proof the scene data is really data",
    body: "The farm reuses the character rigs, the router and the theme, and changes only its own data module. It is the test that nothing about the office is hard-coded.",
    facts: [
      ["Animals", "2 pigs · 3 hens"],
      ["Props", "Merged meshes"],
      ["Router", "Shared"],
    ],
    modes: [{ id: "day", label: "Day", src: image("farm.webp") }],
    hotspots: [
      {
        x: 30,
        y: 25,
        title: "Windmill",
        body: "Animated on the same frame loop as the characters. There is no physics engine anywhere in the scene.",
      },
      {
        x: 18,
        y: 50,
        title: "Solar array",
        body: "Four panels, one merged mesh. Merged vertex-coloured geometry is how every prop in every scene stays cheap.",
      },
      {
        x: 26,
        y: 56,
        title: "Vera's route",
        body: "Each farm role has its own idle spots. Vera checks the beds, Atlas checks the pens, Nova checks the array.",
      },
      {
        x: 78,
        y: 54,
        title: "Pig pen",
        body: "Animals wander inside the same walk graph the humans use, so nothing ever leaves its pen.",
      },
      {
        x: 65,
        y: 82,
        title: "Chicken run",
        body: "Same router, same tick, same day/night palette — a second world for the cost of one data file.",
      },
    ],
  },
]

export const architecture = {
  label: "03 — How it works",
  title: "No Express. No WebSocket. No second process in the browser.",
  body: "The whole app is one Vite project. Five plugins answer /api/* inside the dev server, and the desktop shell mounts the same five on a Node server. Both read the machine and return derived state — never log lines, never file paths, never commands from the request.",
  tiers: [
    {
      kicker: "In the tab",
      title: "One canvas, many scenes",
      items: [
        "React 18 + React Three Fiber",
        "Lazy-loaded scene subtrees",
        "HTML/CSS overlay panels",
        "Theme + roster in one store",
      ],
    },
    {
      kicker: "Local server",
      title: "Five bridges",
      items: [
        "GET /api/tools/status",
        "GET + POST /api/projects",
        "GET + PATCH /api/config",
        "GET /api/resources · /api/office",
      ],
    },
    {
      kicker: "On the machine",
      title: "Read, derive, answer",
      items: [
        ".local/settings.json",
        "Agent logs + opencode.db",
        "tasklist / ps process table",
        "Dev servers, spawn and stop",
      ],
    },
  ],
  flows: [
    { from: 0, to: 1, label: "poll 2s" },
    { from: 1, to: 2, label: "read-only" },
  ],
  note: "A request returns the current snapshot immediately and starts a refresh only when it is stale. No client attached, no work done.",
}

export const stack = {
  label: "04 — Stack",
  title: "A short dependency list, on purpose.",
  body: "Six runtime packages. Each one is here because the alternative was worse, not because it was familiar.",
  groups: ["Frontend", "3D", "Local backend", "Desktop"],
  items: [
    {
      name: "React 18",
      group: "Frontend",
      why: "Every panel is plain HTML over the canvas, so text stays crisp, selectable and readable by a screen reader.",
    },
    {
      name: "React Three Fiber",
      group: "3D",
      why: "The scene is a React tree. Theme, roster and status are the same state the overlays read — no bridge between the UI and the world.",
    },
    {
      name: "three.js",
      group: "3D",
      why: "Rooms and props merge into a handful of vertex-coloured meshes: no textures, one shadow map, no per-prop model loads.",
    },
    {
      name: "Vite 6",
      group: "Local backend",
      why: "The backend is five dev-server plugins. Nothing to install, nothing to start, and none of it ships in the production bundle.",
    },
    {
      name: "Node built-ins",
      group: "Local backend",
      why: "node:sqlite reads OpenCode's database read-only; tasklist and ps answer presence. No driver, no ORM, no new package.",
    },
    {
      name: "Tauri 2",
      group: "Desktop",
      why: "A shell that spawns the same Node server on open and kills its process tree on close. One codebase, real installers.",
    },
  ],
}

export const notes = {
  label: "05 — Worth knowing",
  title: "Three things that make it feel alive.",
  body: "The plain-English version of what was actually difficult, without a diagram.",
  items: [
    {
      index: "01",
      title: "The walls get out of the way",
      body: "Four solid walls hide every room. The outer wall that faces the camera drops to a low kerb, so you can see into the office from any angle without cutting the building open.",
    },
    {
      index: "02",
      title: "Characters walk a drawn map",
      body: "There is no physics engine. Each desk and room has a few hand-placed points, and a character only takes a step that has no wall or desk in the way.",
    },
    {
      index: "03",
      title: "Idle really means idle",
      body: "Status refreshes every two seconds, and only while the tab is open. Close it and nothing keeps reading your machine.",
    },
  ],
}

export const footer = {
  credit:
    "Characters and animations: KayKit Adventurers 2.0 and Character Animations 1.1 (CC0) by Kay Lousberg. Potted plant: Poly Haven (CC0). Tool icons belong to their respective owners.",
  note: "Virtual Spaces — local-first by design. No telemetry, no accounts.",
}
