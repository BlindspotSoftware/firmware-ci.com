// Plays the hero loop (partials/sections/hero.njk, scenes from _data/heroLoop.js).
//
// - scales the fixed-size stage to its frame (--k)
// - advances the scenes on their timers and drives the pipeline scene
// - pause/play button, one button per scene, ← → while focus is in the loop
// - holds while the loop is off screen, the tab is hidden, or keyboard focus
//   is inside it
// - links to #loop-<key> scroll to the loop and start it on that scene

const PIPELINE_START = 1300; // ms into the pipeline scene before the first step runs
const PIPELINE_STEP = 1300; // ms per step

export function initLoop(root) {
  const frame = root.querySelector(".loop__frame");
  const stage = root.querySelector(".loop__stage");
  const live = root.querySelector(".loop__scenes");
  const scenes = [...root.querySelectorAll(".loop__scene")];
  const dots = [...root.querySelectorAll(".loop__dot")];
  const toggle = root.querySelector(".loop__toggle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!frame || !stage || !scenes.length) return;

  let index = 0;
  let elapsed = 0; // ms spent on the current scene
  let last = null; // timestamp of the previous frame
  let raf = 0;
  let userPaused = false;
  const holds = new Set(); // "offscreen" | "hidden" | "focus"

  /* ---------- scale ---------- */

  const fit = () => {
    const width = stage.offsetWidth;
    if (width) root.style.setProperty("--k", String(frame.clientWidth / width));
  };
  new ResizeObserver(fit).observe(frame);
  fit();
  root.classList.add("is-scaled");

  /* ---------- scenes ---------- */

  const duration = (i) => (Number(scenes[i].dataset.seconds) || 6) * 1000;

  function show(i) {
    index = (i + scenes.length) % scenes.length;
    elapsed = 0;
    last = null;

    scenes.forEach((scene, j) => scene.classList.toggle("is-active", j === index));
    dots.forEach((dot, j) => {
      dot.classList.toggle("is-done", j < index);
      dot.classList.toggle("is-running", j === index);
      dot.classList.toggle("is-queued", j > index);
      dot.style.setProperty("--p", "0");
      if (j === index) dot.setAttribute("aria-current", "step");
      else dot.removeAttribute("aria-current");
    });
    stepPipeline();
  }

  // The pipeline scene lights its steps one after another: queued → running → done.
  function stepPipeline() {
    const nodes = scenes[index].querySelectorAll(".node");
    nodes.forEach((node, i) => {
      const start = PIPELINE_START + i * PIPELINE_STEP;
      const end = start + PIPELINE_STEP - 150;
      const state = elapsed < start ? "is-queued" : elapsed < end ? "is-running" : "is-done";
      if (!node.classList.contains(state)) {
        node.classList.remove("is-queued", "is-running", "is-done");
        node.classList.add(state);
      }
    });
  }

  /* ---------- clock ---------- */

  const playing = () => !userPaused && holds.size === 0;

  function tick(now) {
    raf = 0;
    if (!playing()) {
      last = null;
      return;
    }
    if (last !== null) elapsed += Math.min(now - last, 250);
    last = now;

    const total = duration(index);
    dots[index]?.style.setProperty("--p", Math.min(1, elapsed / total).toFixed(4));
    stepPipeline();
    if (elapsed >= total) show(index + 1);

    raf = requestAnimationFrame(tick);
  }

  function sync() {
    const isPlaying = playing();
    root.classList.toggle("is-paused", !isPlaying);
    root.classList.toggle("is-user-paused", userPaused);
    toggle?.setAttribute("aria-label", userPaused ? "Play the loop" : "Pause the loop");
    // While it rotates on its own the loop stays quiet for screen readers;
    // when it stands still, scene changes are announced.
    live?.setAttribute("aria-live", isPlaying ? "off" : "polite");
    if (isPlaying && !raf) raf = requestAnimationFrame(tick);
  }

  const hold = (reason, on) => {
    if (on) holds.add(reason);
    else holds.delete(reason);
    sync();
  };

  /* ---------- controls ---------- */

  toggle?.addEventListener("click", () => {
    userPaused = !userPaused;
    sync();
  });

  dots.forEach((dot, j) =>
    dot.addEventListener("click", () => {
      if (j !== index) show(j);
    })
  );

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") show(index + 1);
    else if (event.key === "ArrowLeft") show(index - 1);
    else return;
    event.preventDefault();
  });

  // Hold while keyboard focus is inside, so the slide does not change under it.
  root.addEventListener("focusin", (event) => {
    if (event.target.matches(":focus-visible")) hold("focus", true);
  });
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget)) hold("focus", false);
  });

  new IntersectionObserver(([entry]) => hold("offscreen", !entry.isIntersecting), {
    threshold: 0.25,
  }).observe(frame);

  document.addEventListener("visibilitychange", () => hold("hidden", document.hidden));

  /* ---------- #loop-<key> links ---------- */

  const sceneFromHash = (hash) => {
    const match = /^#loop-([\w-]+)$/.exec(hash || "");
    return match ? scenes.findIndex((scene) => scene.dataset.key === match[1]) : -1;
  };

  const jumpTo = (i) => {
    show(i);
    root.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href*='#loop-']");
    if (!link || link.origin !== location.origin || link.pathname !== location.pathname) return;
    const i = sceneFromHash(link.hash);
    if (i < 0) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, "", link.hash);
    jumpTo(i);
  });

  window.addEventListener("hashchange", () => {
    const i = sceneFromHash(location.hash);
    if (i >= 0) jumpTo(i);
  });

  const initial = sceneFromHash(location.hash);
  if (initial >= 0) jumpTo(initial);
  else show(0);
  sync();
}

const root = document.querySelector("[data-loop]");
if (root) initLoop(root);
