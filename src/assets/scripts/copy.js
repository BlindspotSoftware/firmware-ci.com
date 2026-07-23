// Copy-to-clipboard for any [data-copy] button (e.g. the contact email).
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.getAttribute("data-copy"));
      const original = btn.textContent;
      btn.textContent = "Copied ✓";
      btn.setAttribute("disabled", "");
      setTimeout(() => {
        btn.textContent = original;
        btn.removeAttribute("disabled");
      }, 1600);
    } catch (e) {
      /* clipboard blocked — the address is visible above to copy manually */
    }
  });
});
