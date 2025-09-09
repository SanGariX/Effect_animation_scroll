import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import linears from "./linear";
import frames from "./frames";
import ring from "./ring";

const lenis = new Lenis({
  duration: 1.3, // плавність
  smoothWheel: true,
});
lenis.on("scroll", ScrollTrigger.update);
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
frames(gsap, ScrollTrigger);

linears(gsap);

ring(gsap, ScrollTrigger);
// __
