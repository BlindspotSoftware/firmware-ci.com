import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../facts";

gsap.registerPlugin(ScrollTrigger);

// Hero
gsap.fromTo(
  ".hero [data-stagger]",
  {
    opacity: 0,
    y: 48,
  },
  {
    delay: 0.2,
    opacity: 1,
    y: 0,
    stagger: 0.22,
    duration: 0.8,
    ease: "circ.out",
  }
);

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
