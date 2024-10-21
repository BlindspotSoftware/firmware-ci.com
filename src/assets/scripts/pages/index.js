import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
