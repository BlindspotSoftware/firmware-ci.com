import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.from(".footer__shape path", {
  yPercent: 80,
  stagger: 0.1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".footer__shape",
    start: "top bottom",
    end: "bottom bottom",
    scrub: 4,
  },
});
