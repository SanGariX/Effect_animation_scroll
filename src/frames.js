const frames = (gsap, ScrollTrigger) => {
  window.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const step = 2500,
      NumberSteps = [...slides].length,
      resultFar = NumberSteps * step;
    styleSlider(slides, step, gsap);
    const getinitialTranslateZ = (slide) => {
      const style = window.getComputedStyle(slide);
      const matrix = style.transform.match(/matrix3d\((.+)\)/);
      if (matrix) {
        const values = matrix[1].split(", ");
        return Number(values[14] || 0);
      }
      return 0;
    };
    const mapRange = (value, inMin, inMax, outMin, outMax) => {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    };
    slides.forEach((slide, index) => {
      const initialZ = getinitialTranslateZ(slide);

      ScrollTrigger.create({
        trigger: ".container_slider",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress,
            zIncrement = progress * resultFar,
            currentZ = initialZ + zIncrement;
          let opacity;
          if (currentZ > -step * 2) {
            opacity = mapRange(currentZ, -step * 2, 0, 0, 1);
          } else {
            opacity = 0;
          }

          if (index === slides.length - 1 && -currentZ < -100) {
            gsap.set(slide, {
              opacity: 1,
              xPercent: -50,
              yPercent: -50,
              z: 100,
            });
            return;
          }
          gsap.set(slide, {
            opacity: opacity,
            xPercent: -50,
            yPercent: -50,
            z: currentZ,
          });
        },
      });
    });
  });
};
function styleSlider(slides, step, gsap) {
  const slider = document.querySelector(".slider");
  gsap.set(slider, {
    position: "sticky",
    top: 0,
    width: "100%",
    height: "100vh",
    perspective: 750,
    overflow: "hidden",
  });
  const container = document.querySelector(".container_slider");
  const heightCoefficient = 4000 / step;
  container.style.height = `calc(${
    step * slides.length * heightCoefficient
  }px)`;
  slides.forEach((slide, index) => {
    if (index % 2 === 0) {
      gsap.set(slide, {
        top: "50%",
        left: "25%",
      });
    } else {
      gsap.set(slide, {
        top: "50%",
        left: "75%",
      });
    }
    gsap.set(slide, {
      position: "absolute",
      overflow: "hidden",
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
      z: -step * index,
    });
  });
}
export default frames;
