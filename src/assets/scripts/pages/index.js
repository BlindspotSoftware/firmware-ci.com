import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../facts";

gsap.registerPlugin(ScrollTrigger);

// Text Image Parallax, while copy and screenshot sit side by side (--xl in _text-image.css)
gsap.matchMedia().add("(width > 62em)", () => {
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
