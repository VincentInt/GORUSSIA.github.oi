import goodsShopBase from "./data/Shop.json" assert {type: "json"}

export const shopBannerFunc = () => {
  let indexSlide = 0;
  const intlObj = Intl;

  const mainContainerSlideShopElem = document.getElementById(
    "main_container_slide_shop"
  );
  const containerSlideElem = document.getElementById("container_slide_shop");
  const containerImgShopElem = document.getElementById("container_img_shop");

  const leftArrowElem = document.getElementById("left_btn_arrow_shop");
  const rigthArrowElem = document.getElementById("rigth_btn_arrow_shop");

  leftArrowElem.onclick = () => moveSlide(false);
  rigthArrowElem.onclick = () => moveSlide(true);

  function moveSlide(move) {
    move ? (indexSlide += 1) : (indexSlide -= 1);
    if (indexSlide < 0) indexSlide = goodsShopBase.banner.length - 1;
    if (indexSlide >= goodsShopBase.banner.length) indexSlide = 0;
    renderSlide();
  }
  function renderSlide() {
    const elem = goodsShopBase.banner[indexSlide];
  
    mainContainerSlideShopElem.style =
      "transition: opacity 0.5s ease-in; opacity: 0;";
    setTimeout(() => {
      containerSlideElem.innerHTML = "";
      containerImgShopElem.innerHTML = "";
      containerSlideElem.insertAdjacentHTML(
        "beforeend",
        `  <h3 class="upper_text category_text">Товар:</h3>
            <h2 class="upper_text">${elem.goodsName}</h2>
            <div class="container_price">
              <h2 class="upper_text price_text">${intlObj
                .NumberFormat("eng")
                .format(elem.price)} РУБ</h2>
              <button class="btn_sell">Купить</button>
            </div>`
      );
      containerImgShopElem.insertAdjacentHTML(
        "beforeend",
        `<img
      class="img_goods"
      src="${elem.img}"
      alt="goods_img"
    />`
      );
      mainContainerSlideShopElem.style =
        "transition: opacity 0.5s ease-in; opacity: 100;";
    }, 500);
  }

  renderSlide();
};
