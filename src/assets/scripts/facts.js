const facts = document.querySelectorAll(".fact");
const factObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("is-in-view")
      ) {
        entry.target.classList.add("is-in-view");
      }
    });
  },
  { threshold: 0.1 }
);

facts.forEach((fact) => factObserver.observe(fact));

const devicesIntegratedFact = document.querySelector(
  "[data-fact='devices-integrated']"
);
const testRunsFact = document.querySelector("[data-fact='tests-run']");
const hoursSavedFact = document.querySelector("[data-fact='hours-saved']");

let newTestRuns = +testRunsFact.dataset.countTo;

// Starting November 19th 2024, we increas the testRuns by 12 every day
const today = new Date();
const november20th2024 = new Date("2024-11-19");
const diffTime = Math.abs(today - november20th2024);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

newTestRuns += diffDays * 12;

testRunsFact.dataset.countTo = newTestRuns;
testRunsFact.style.setProperty("--count-to", newTestRuns);

hoursSavedFact.dataset.countTo = Math.round(newTestRuns * 4.7);
hoursSavedFact.style.setProperty("--count-to", Math.round(newTestRuns * 4.7));
