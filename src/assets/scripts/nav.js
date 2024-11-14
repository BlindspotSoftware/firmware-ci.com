const navToggle = document.getElementById("nav-toggle");
const headerLinks = document.querySelectorAll(".header a");

// Mobile nav toggle
navToggle.addEventListener("click", () => {
  navToggle.setAttribute(
    "aria-expanded",
    navToggle.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );
});

// Close the nav when a link is clicked
headerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
  });
});
