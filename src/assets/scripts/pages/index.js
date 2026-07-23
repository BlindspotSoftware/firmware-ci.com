import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../facts";

gsap.registerPlugin(ScrollTrigger);

// Hero animation (desktop only)
gsap.matchMedia().add("(min-width: 62em)", () => {
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
      // Drop the inline transform once the fade-up finishes so the CSS tilt on
      // the screenshots wins — otherwise the hidden (theme-swapped) image keeps
      // GSAP's flat transform and appears un-skewed after a light/dark toggle.
      clearProps: "transform",
    }
  );
});

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
