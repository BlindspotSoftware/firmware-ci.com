import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Hero
gsap.fromTo(
  ".hero > *",
  {
    opacity: 0,
    y: 48,
  },
  {
    delay: 0.2,
    opacity: 1,
    y: 0,
    stagger: 0.22,
    duration: 0.6,
    ease: "circ.out",
  }
);

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
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

counters.forEach((counter) => counterObserver.observe(counter));
