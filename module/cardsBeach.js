import beachsBaseArray from "./data/Beach.json" assert { type: "json" };

export const cardsBeachFunc = () => {
  const beachCardsElem = document.getElementById("container_beach_cards");
  const wrapperBeachSlides = document.getElementById("wrapper_beach_slides");
  const leftBtnElem = document.getElementById("left_beach_banner_btn");
  const rigthBtnElem = document.getElementById("rigth_beach_banner_btn");

  leftBtnElem.onclick = () => changeBtn(true);
  rigthBtnElem.onclick = () => changeBtn(false);

  window.addEventListener("resize", render);

  document.addEventListener("touchstart", changeStartTouch);
  document.addEventListener("touchend", changeEndTouch);

  let widthCard = null;
  let positionBannerPx = 0;
  let movePositionPX = null;
  let startMouseDownPositionPx = null;
  let startTouchStatus = false;

  wrapperBeachSlides.onmouseup = () => removeChangeMousedown();
  wrapperBeachSlides.onmouseleave = () => removeChangeMousedown();

  beachCardsElem.onmousedown = (mouse) => {
    if (window.event.stopPropagation) window.event.stopPropagation();
    window.event.cancelBubble = true;
    mouse.cancelBubble = true;

    startMouseDownPositionPx = mouse.clientX;

    document.addEventListener("mousemove", changeMoveBanner);
  };

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
  function changeBtn(where) {
    if (where) {
      movePositionPX += widthCard;
    } else {
      movePositionPX -= widthCard;
    }
    removeChangeMousedown();
  }
  function removeChangeMousedown() {
    const maxPositionBannerPx = -(
      beachCardsElem.scrollWidth - beachCardsElem.offsetWidth
    );
    const minPositionBannerPx = 0;

    positionBannerPx += movePositionPX - positionBannerPx;

    if (maxPositionBannerPx > positionBannerPx) {
      positionBannerPx = maxPositionBannerPx;
      movePositionPX = minPositionBannerPx
      transformXMove(positionBannerPx, "transition-duration: 400ms;");

      setTimeout(
        () =>
          (beachCardsElem.style = `transform: translateX(${positionBannerPx}px); transition-duration: 0ms;`),
        400
      );
    } else if (minPositionBannerPx < positionBannerPx) {
      positionBannerPx = minPositionBannerPx;
      movePositionPX = maxPositionBannerPx
      transformXMove(positionBannerPx, "transition-duration: 400ms;");

      setTimeout(
        () =>
          (beachCardsElem.style = `transform: translateX(${positionBannerPx}px); transition-duration: 0ms;`),
        400
      );
    }
    positionBannerPx = Math.round(positionBannerPx / -widthCard) * -widthCard;

    transformXMove(positionBannerPx, "transition-duration: 400ms;");
    document.removeEventListener("mousemove", changeMoveBanner);
    document.removeEventListener("touchmove", changeMoveTouch);
  }
  function changeMoveBanner({ x }) {
    movePositionPX = positionBannerPx + x - startMouseDownPositionPx;
    transformXMove(movePositionPX);
  }
  function render() {
    beachCardsElem.innerHTML = "";
    beachsBaseArray.forEach((elem) => {
      beachCardsElem.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="beach_card">
        <div class="window_img_beach">
          <img class="img_beach"  
            src="${elem.img}"
            alt="img_beach">
        </div>
        <div class="container_text">
          <h2 class="upper_text text_beach">${elem.beachName}</h2>
          <div class="locate_rotate_text">
            <h4 class="text_locate">${elem.locate.region}</h4>
            <h4 class="text_locate">${elem.locate.beachLocate}</h4>
          </div>
        </div>
      </div>
    `
      );
    });

    const adaptiveWidthCard =
      beachCardsElem.offsetWidth /
      Math.floor(
        beachCardsElem.offsetWidth / beachCardsElem.children[0].clientWidth
      );
    for (let i = 0; i < beachCardsElem.children.length; i++) {
      let style = "";
      if (i % 2) style = "margin-top: -40px";

      beachCardsElem.children[
        i
      ].style = `${beachCardsElem.children[i].style}; ${style}; min-width: ${adaptiveWidthCard}px`;
    }
    widthCard = beachCardsElem.children[0].clientWidth;
  }
  render();
};
