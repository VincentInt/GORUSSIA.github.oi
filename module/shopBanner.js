import { MainSliderUtils } from "./Utils/SliderUtils.js";
import goodsShopBase from "./data/Shop.json" assert { type: "json" };

export const shopBannerFunc = () => {
  const intlObj = Intl;

  const mainContainerSlideShopElem = document.getElementById(
    "main_container_slide_shop"
  );
  const containerSlideElem = document.getElementById("container_slide_shop");
  const containerImgShopElem = document.getElementById("container_img_shop");
  const shopNameGoodsElem = document.getElementById("shop_name_goods");
  const textPriceElem = document.getElementById("shop_price");

  const leftArrowElem = document.getElementById("left_btn_arrow_shop");
  const rigthArrowElem = document.getElementById("rigth_btn_arrow_shop");

  const ShopBanner = new MainSliderUtils(
    leftArrowElem,
    rigthArrowElem,
    mainContainerSlideShopElem,
    containerSlideElem,
    containerImgShopElem,
    shopNameGoodsElem,
    goodsShopBase,
    renderShop
  );
  function renderShop() {
    textPriceElem.innerHTML = `
      ${intlObj.NumberFormat("en").format(ShopBanner.itemSlide.price)} РУБ
    `;
  }
  ShopBanner.attenuationSlide();
  ShopBanner.render();
};
