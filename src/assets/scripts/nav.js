const navToggle = document.getElementById("nav-toggle");

navToggle.addEventListener("click", () => {
  navToggle.setAttribute(
    "aria-expanded",
    navToggle.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );
});
