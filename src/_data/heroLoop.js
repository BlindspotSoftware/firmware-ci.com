/**
 * The OCP booth loop, as the homepage hero.
 *
 * THE SCRIPT below is the one from the booth (firmwareci-booth-loop.html). Edit
 * the words here: the scenes are rendered to HTML at build time by the renderers
 * further down (ported 1:1 from the booth file) and played by
 * `assets/scripts/loop.js`. The only content change against the booth is the
 * call to action: instead of "Live demo at this booth" the loop carries the
 * "See it in action" button that used to sit in the hero.
 *
 * Every scene has a `key`; a link to `/#loop-<key>` scrolls to the loop and
 * starts it on that scene. A feature scene also gets a "Learn more ↓" link
 * down to the section that tells more about it: each section in _data/home.js
 * names its scene (`scene`), see `more` below.
 */
import fs from "node:fs";
import home from "./home.js";

const cta = {
  text: "See it in action",
  url: "https://app.firmware-ci.com/public-orgs",
};

const scenes = [
  {
    key: "hook", type: "hook", seconds: 6, pill: "build passed",
    headline: "Your CI says green.", support: "…but did the server boot?",
  },
  {
    key: "today", type: "strike", seconds: 6, headline: "Firmware testing today:",
    lines: ["Flashing by hand.", "Waiting for the bench.", "Bugs found weeks later."],
  },
  {
    key: "firmwareci", type: "brand", seconds: 7, headline: "FirmwareCI",
    support: "Continuous integration for firmware. <b>On real hardware.</b>",
  },
  {
    key: "pipeline", type: "pipeline", seconds: 12, headline: "Every commit. Real hardware. No hands.",
    steps: [["Push", "git"], ["Flash", "BIOS · BMC"], ["Power-cycle", "cold boot"], ["Boot", "serial · SSH"], ["Test", "your suite"], ["Report", "✓ on your PR"]],
  },
  {
    key: "tests", type: "tags", seconds: 8, headline: "Test what servers live on.",
    tags: ["BIOS update & rollback", "Settings persistence", "Secure Boot", "Redfish conformance", "BMC update", "IPMI power", "CHIPSEC", "FWTS", "Disk encryption & TPM", "Performance"],
  },
  {
    key: "tests-as-code", type: "code", seconds: 8, headline: "Tests as code, in your repo.",
    file: ".firmwareci/workflows/server/tests/bios-upgrade.yaml",
    chips: [["GitHub", "result on your PR"], ["GitLab", "result on your MR"], ["fwci CLI", "laptop or CI job"], ["REST API", "anything else"]],
  },
  {
    key: "labs", type: "labs", seconds: 8, headline: "Your lab, our lab, or both.",
    support: "Hosted, on-prem or fully air-gapped. Labs connect from anywhere.",
    center: "FirmwareCI", labs: ["Your lab", "Remote lab · VPN", "Hosted by us"],
  },
  {
    key: "ai", type: "chat", seconds: 8, headline: "Ask your AI why it failed.",
    question: "Why did last night's BIOS run fail?",
    who: "FirmwareCI via MCP", severity: "infrastructure",
    answer: "Root cause: BMC unreachable in pre-stage (no route to host). <span>A lab network issue, not your firmware.</span>",
    support: "FirmwareCI speaks MCP: read logs, explain failures, check your tests.",
  },
  {
    key: "dutctl", type: "modules", seconds: 6, headline: "Hardware Abstraction Layer, open source.",
    repo: "github.com/BlindspotSoftware/dutctl",
    modules: ["Power", "Flash", "Serial", "GPIO", "IPMI"],
  },
  {
    // On the booth the arrow pointed down at the demo station; here it points
    // at the "See it in action" button.
    key: "see-it", type: "close", seconds: 7, headline: "See it run, right here.", arrow: "cta",
    urls: ["firmware-ci.com", "github.com/BlindspotSoftware/dutctl"],
  },
];

/* ---------- renderers (ported from the booth loop) ---------- */

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const rich = (s) => esc(s).replace(/&lt;(\/?)(b|span)&gt;/g, "<$1$2>"); // allow <b> and <span> in copy
const plain = (s) => String(s).replace(/<[^>]+>/g, "");
const d = (ms) => `style="--d:${ms}ms"`;
const logo = (cls = "") => `<svg class="${cls}" viewBox="0 0 102 62" aria-hidden="true" focusable="false"><use href="#loop-logo-firmwareci"/></svg>`;

const YAML = [
  '<span class="k">name</span>: <span class="s">BIOS Upgrade</span>',
  '<span class="k">stages</span>:',
  '  - <span class="k">name</span>: <span class="s">Apply upgrade</span>',
  '    <span class="k">steps</span>:',
  '      - <span class="k">cmd</span>: dutctl   <span class="c"># flash BIOS image</span>',
  '        <span class="k">command</span>: flash',
  '      - <span class="k">cmd</span>: dutctl   <span class="c"># cold boot</span>',
  '        <span class="k">command</span>: power-cycle',
  '  - <span class="k">name</span>: <span class="s">Verify upgrade</span>',
  '    <span class="k">steps</span>:',
  '      - <span class="k">cmd</span>: shell',
  '        <span class="k">command</span>: cat /sys/class/dmi/id/bios_version',
  '        <span class="k">expect</span>: <span class="s">"2.92"</span>',
];

const card = (x, y, w, h, label, fs) =>
  `<g><path d="M${x - w / 2} ${y - h / 2} H${x + w / 2 - h / 2} A${h / 2} ${h / 2} 0 0 1 ${x + w / 2} ${y} V${y + h / 2} H${x - w / 2} Z" class="fill-card"/><text x="${x}" y="${y + fs * 0.36}" text-anchor="middle" font-size="${fs}" font-weight="800">${esc(label)}</text></g>`;

const R = {
  hook: (s) => `
    <div class="pill in" ${d(100)}><span class="lf"></span>${esc(s.pill)}</div>
    <p class="ttl in" ${d(500)}>${rich(s.headline)}</p>
    <p class="sub sub--hook in" ${d(1900)}>${rich(s.support)}<span class="cursor"></span></p>`,

  strike: (s) => `
    <p class="ttl m in" ${d(100)}>${rich(s.headline)}</p>
    <div class="strikes">${s.lines.map((l, i) => `<p class="strike in" style="--d:${500 + i * 350}ms;--s:${2200 + i * 500}ms">${esc(l)}</p>`).join("")}</div>`,

  brand: (s) => `
    <div class="brandrow in" ${d(100)}>${logo()}<p class="ttl">${rich(s.headline)}</p></div>
    <p class="sub sub--brand in" ${d(700)}>${rich(s.support)}</p>
    <div class="leafrow" aria-hidden="true">${["queued", "running", "done", "done", "done", "done"].map((c, i) => `<i style="--c:var(--${c});--d:${1300 + i * 120}ms"></i>`).join("")}</div>`,

  pipeline: (s) => `
    <p class="ttl m in" ${d(100)}>${rich(s.headline)}</p>
    <ol class="pipe in" ${d(400)}>${s.steps.map(([a, b]) => `<li class="node is-queued"><span class="box" aria-hidden="true"></span><span class="lb">${esc(a)}</span><span class="sm">${esc(b)}</span></li>`).join("")}</ol>`,

  tags: (s) => `
    <p class="ttl m in" ${d(100)}>${rich(s.headline)}</p>
    <ul class="tags">${s.tags.map((t, i) => `<li class="tag in" style="--d:${500 + i * 260}ms"><i aria-hidden="true"></i>${esc(t)}</li>`).join("")}</ul>`,

  code: (s) => `
    <p class="ttl m in" ${d(100)}>${rich(s.headline)}</p>
    <div class="split">
      <pre class="code mono in" ${d(300)}><span class="file">${esc(s.file)}</span>${YAML.map((l, i) => `<span class="ln" style="--d:${700 + i * 330}ms">${l}</span>`).join("")}</pre>
      <ul class="chips">${s.chips.map(([a, b], i) => `<li class="chip in" style="--d:${1200 + i * 500}ms"><i aria-hidden="true"></i>${esc(a)}<small>${esc(b)}</small></li>`).join("")}</ul>
    </div>`,

  labs: (s) => {
    const label = `${s.center} connected to: ${s.labs.join(", ")}`;
    // Landscape: the booth layout. Labs left and right of the hub.
    const cx = 810, cy = 200, pos = [[210, 70], [210, 330], [1410, 200]];
    const wires = pos.map(([x, y], i) => {
      const L = x < cx, x0 = L ? x + 200 : x - 200, x1 = L ? cx - 240 : cx + 240;
      return `<path class="wire" style="--d:${600 + i * 400}ms" d="M${x0} ${y} C ${(x0 + x1) / 2} ${y}, ${(x0 + x1) / 2} ${cy}, ${x1} ${cy}"/>`;
    }).join("");
    const wide = `<svg class="labs__wide" viewBox="0 0 1620 420" role="img" aria-label="${esc(label)}">${wires}
      ${card(cx, cy, 480, 150, s.center, 56)}
      ${pos.map(([x, y], i) => card(x, y, 400, 110, s.labs[i] || "", 36)).join("")}
    </svg>`;
    // Portrait (phones): the hub on top, the labs stacked below it.
    const hx = 476, hy = 85, ys = [300, 450, 600], lx = 595;
    const tallWires = ys.map((y, i) => `<path class="wire" style="--d:${600 + i * 400}ms" d="M${hx - 240} ${hy} C 110 ${hy}, 110 ${y}, ${lx - 340} ${y}"/>`).join("");
    const tall = `<svg class="labs__tall" viewBox="0 0 952 660" role="img" aria-label="${esc(label)}">${tallWires}
      ${card(hx, hy, 480, 150, s.center, 60)}
      ${ys.map((y, i) => card(lx, y, 680, 112, s.labs[i] || "", 46)).join("")}
    </svg>`;
    return `
    <p class="ttl m in" ${d(100)}>${rich(s.headline)}</p>
    <div class="labs in" ${d(300)}>${wide}${tall}</div>
    <p class="sub sub--small in" ${d(1600)}>${rich(s.support)}</p>`;
  },

  chat: (s) => `
    <p class="ttl m in" ${d(100)}>${rich(s.headline)}</p>
    <div class="chat">
      <p class="bubble in" ${d(700)}>${esc(s.question)}</p>
      <div class="answer in" ${d(2200)}><p class="who">${esc(s.who)} <span class="sev">${esc(s.severity)}</span></p><p class="txt">${rich(s.answer)}</p></div>
    </div>
    <p class="sub sub--small in" ${d(3400)}>${rich(s.support)}</p>`,

  modules: (s) => {
    const label = `dutctl drives ${s.modules.join(", ")}`;
    const box = (x, y, w, h, name, fs) => `<g><rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" class="fill-card"/><text x="${x}" y="${y + h / 2 + fs * 0.36}" text-anchor="middle" font-size="${fs}" font-weight="800">${esc(name)}</text></g>`;
    const hub = (x, y, w, h, fs1, fs2) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" class="fill-ink"/>
      <text x="${x}" y="${y + h * 0.48}" text-anchor="middle" font-size="${fs1}" font-weight="900" class="fill-inv">dutctl</text>
      <text x="${x}" y="${y + h * 0.8}" text-anchor="middle" font-size="${fs2}" font-weight="500" class="fill-inv-2">any board · any lab</text>`;
    // Landscape: the booth layout, all modules in one row.
    const n = s.modules.length, cx = 810, cy = 190;
    const xs = s.modules.map((_, i) => 140 + i * (1340 / (n - 1)));
    const wide = `<svg class="mods__wide" viewBox="0 0 1620 400" role="img" aria-label="${esc(label)}">
      ${xs.map((x, i) => `<line class="lnk" style="--d:${900 + i * 180}ms" x1="${x}" y1="140" x2="${cx}" y2="${cy + 40}"/>`).join("")}
      ${xs.map((x, i) => box(x, 40, 240, 100, s.modules[i], 40)).join("")}
      ${hub(cx, cy + 40, 520, 150, 52, 30)}
    </svg>`;
    // Portrait (phones): modules in two rows above the hub.
    const rows = [s.modules.slice(0, 3), s.modules.slice(3)];
    const cells = rows.flatMap((row, r) => row.map((name, i) => ({ name, x: 476 + (i - (row.length - 1) / 2) * 310, y: 20 + r * 150 })));
    const tall = `<svg class="mods__tall" viewBox="0 0 952 600" role="img" aria-label="${esc(label)}">
      ${cells.map((c, i) => `<line class="lnk" style="--d:${900 + i * 180}ms" x1="${c.x}" y1="${c.y + 110}" x2="476" y2="400"/>`).join("")}
      ${cells.map((c) => box(c.x, c.y, 270, 110, c.name, 48)).join("")}
      ${hub(476, 400, 600, 180, 70, 38)}
    </svg>`;
    return `
    <p class="ttl m in" ${d(100)}>${rich(s.headline)}</p>
    <div class="mods in" ${d(300)}>${wide}${tall}</div>
    <p class="sub sub--repo mono in" ${d(1800)}>${esc(s.repo)}</p>`;
  },

  close: (s) => `
    <div class="closerow in" ${d(100)}>${logo("logo")}<p class="ttl">${rich(s.headline)}</p></div>
    <div class="closerow closerow--links in" ${d(700)}><span class="arrow" aria-hidden="true"><span>↓</span></span><p class="urls">${s.urls.map((u) => `<span class="mono">${esc(u)}</span>`).join("")}</p></div>`,
};

/* ---------- the two marks used inside the stage, from src/assets/icons ---------- */

const pathOf = (file) => fs.readFileSync(`./src/assets/icons/${file}`, "utf8").match(/\sd="([^"]+)"/)[1];

/* ---------- "Learn more ↓": the feature section that belongs to a scene ---------- */

const sections = [home.dutctl, ...home.featureSections];
for (const section of sections) {
  if (!scenes.some((scene) => scene.key === section.scene)) {
    console.warn(`[heroLoop] section #${section.id} names no scene of the loop ("${section.scene}")`);
  }
}
const more = (key) => {
  const section = sections.find((s) => s.scene === key);
  return section ? { href: `#${section.id}`, title: section.headline } : null;
};

export default {
  cta,
  marks: {
    firmwareci: pathOf("logo.svg"),
    blindspot: pathOf("blindspot.svg"),
  },
  // Ambient quarter-circle "leaves": x, y, size, corner, fill — for the
  // landscape stage (x/y) and the portrait one (px/py).
  leaves: [
    { x: -60, y: -80, px: -90, py: -110, s: 420, r: "r0", c: "transparent" },
    { x: 1600, y: -120, px: 780, py: -140, s: 380, r: "r2", c: "var(--running)" },
    { x: 1500, y: 700, px: 760, py: 980, s: 520, r: "r3", c: "transparent" },
    { x: -120, y: 760, px: -160, py: 1040, s: 460, r: "r1", c: "var(--done)" },
    { x: 880, y: 860, px: 420, py: 1220, s: 300, r: "r0", c: "var(--queued)" },
  ],
  totalSeconds: scenes.reduce((sum, s) => sum + s.seconds, 0),
  scenes: scenes.map((s, i) => ({
    ...s,
    index: i + 1,
    label: plain(s.headline),
    html: R[s.type](s),
    more: more(s.key),
  })),
};
