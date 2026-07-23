// Light/dark toggle. The theme is resolved before paint by the inline script in
// <head>; this only handles the click and persists the choice.
const btn = document.getElementById("theme-toggle");

if (btn) {
  btn.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* private mode / storage disabled — the choice just won't persist */
    }
  });
}
