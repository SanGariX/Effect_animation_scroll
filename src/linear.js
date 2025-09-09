const linears = (gsap) => {
  const namerLeft = document.querySelectorAll(".left");
  namerLeft.forEach((item) => {
    gsap.fromTo(
      item,
      { x: 0 },
      {
        x: "-100vw",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          scrub: true,
        },
      }
    );
  });
  const namerRight = document.querySelectorAll(".right");
  namerRight.forEach((item) => {
    gsap.fromTo(
      item,
      { x: 0 },
      {
        x: "100vw",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          scrub: true,
        },
      }
    );
  });
};
export default linears;
