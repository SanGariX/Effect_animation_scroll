const ring = (gsap, ScrollTrigger) => {
  window.addEventListener("DOMContentLoaded", () => {
    const ringElement = document.querySelector(".ring");
    const breakPoints = document.querySelectorAll(
      ".ring_box_relative_breakpoint"
    );

    const mapRange = (value, inMin, inMax, outMin, outMax) =>
      ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

    ScrollTrigger.create({
      trigger: ".container_ring",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentProgress = mapRange(progress, 0, 1, 0, 360);

        ringElement.style.background = `conic-gradient(rgb(56, 112, 255) ${currentProgress}deg, transparent ${currentProgress}deg)`;

        if (self.direction === 1) {
          breakPoints.forEach((item, index) => {
            if (currentProgress >= index * 90) {
              gsap.to(item, { opacity: 1, duration: 0.3 });
            }
          });
        }
        if (self.direction === -1) {
          breakPoints.forEach((item, index) => {
            if (currentProgress <= index * 90) {
              gsap.to(item, {
                opacity: 0,
                duration: 0.3,
              });
            }
          });
        }
      },
    });
  });
};

export default ring;
