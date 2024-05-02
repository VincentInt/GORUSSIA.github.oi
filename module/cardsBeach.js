import beachsBaseArray from "./data/Beach.json" assert { type: "json" };

export const cardsBeachFunc = () => {
  const beachCardsElem = document.getElementById("container_beach_cards");
  const wrapperBeachSlides = document.getElementById("wrapper_beach_slides");
  document.addEventListener("touchstart", changeStartTouch);
  document.addEventListener("touchend", changeEndTouch);

  let positionBannerPx = 0;
  let movePositionPX = null;
  let startMouseDownPositionPx = null;
  let startTouchStatus = false;

  beachCardsElem.onmousedown = (mouse) => {
    if (window.event.stopPropagation) window.event.stopPropagation();
    window.event.cancelBubble = true;
    mouse.cancelBubble = true;

    startMouseDownPositionPx = mouse.clientX;

    document.addEventListener("mousemove", changeMoveBanner);
  };

  wrapperBeachSlides.onmouseup = () => removeChangeMousedown();
  wrapperBeachSlides.onmouseleave = () => removeChangeMousedown();

  function changeStartTouch(event) {
    if (
      (event.changedTouches[0].pageY >= beachCardsElem.offsetTop) &
      (event.changedTouches[0].pageY <=
        beachCardsElem.offsetTop + beachCardsElem.offsetHeight)
    ) {
      startTouchStatus = true;
      startMouseDownPositionPx = event.changedTouches[0].clientX;

      document.addEventListener("touchmove", changeMoveTouch);
    }
  }
  function changeMoveTouch(event) {
    if (startTouchStatus) {
      const x = event.changedTouches[0].clientX;
      movePositionPX = positionBannerPx + x - startMouseDownPositionPx;

      transformXMove(movePositionPX);
    }
  }
  function changeEndTouch() {
    if (startTouchStatus) {
      removeChangeMousedown();
      
      startTouchStatus = false;

      document.removeEventListener("touchmove", changeMoveTouch);
    }
  }
  function transformXMove(px, duration = "") {
    beachCardsElem.style = `transform: translateX(${px}px); ${duration}`;
  }

  function removeChangeMousedown() {
    const maxPositionBannerPx = -(
      beachCardsElem.scrollWidth - beachCardsElem.offsetWidth
    );
    const minPositionBannerPx = 0;
    positionBannerPx += movePositionPX - positionBannerPx;

    if (maxPositionBannerPx > positionBannerPx) {
      positionBannerPx = maxPositionBannerPx;
      transformXMove(positionBannerPx, "transition-duration: 400ms;");

      setTimeout(
        () =>
          (beachCardsElem.style = `transform: translateX(${positionBannerPx}px); transition-duration: 0ms;`),
        500
      );
    } else if (minPositionBannerPx < positionBannerPx) {
      positionBannerPx = minPositionBannerPx;
      transformXMove(positionBannerPx, "transition-duration: 400ms;");

      setTimeout(
        () =>
          (beachCardsElem.style = `transform: translateX(${positionBannerPx}px); transition-duration: 0ms;`),
        500
      );
    } else {
    }
    document.removeEventListener("mousemove", changeMoveBanner);
    document.removeEventListener("touchmove", changeMoveTouch);
  }
  function changeMoveBanner({ x }) {
    movePositionPX = positionBannerPx + x - startMouseDownPositionPx;
    transformXMove(movePositionPX);
  }
  function render() {
    beachsBaseArray.forEach((elem, index) => {
      let style = "";

      if (!(index % 2)) style = "margin-top: -40px; margin-bottom: 40px";

      beachCardsElem.insertAdjacentHTML(
        "afterbegin",
        `
    <div style="${style}" class="beach_card">
    <div class="container_img_beach_card">
      <img
        class="img_beach_card"
        src="${elem.img}"
        alt="img_beach"
      />
    </div>
    <div class="container_text_beach_card">
      <h2 class="upper_text text_beach">${elem.beachName}</h2>
      <div class="container_text_location">
        <h4 class="text_location">${elem.locate.region}</h4>
        <h4 class="text_location">${elem.locate.beachLocate}</h4>
      </div>
    </div>
  </div>
    `
      );
    });
  }
  render();
};
