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

// Counters
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

// Text Image Parallax
gsap.matchMedia().add("(width > 48em)", () => {
  gsap.utils.toArray(".text-image__copy").forEach((element) => {
    gsap.fromTo(
      element,
      {
        yPercent: 10,
      },
      {
        yPercent: -10,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
});
