import { bannerMainFunc } from "./module/headerBanner.js";
import { cardsBeachFunc } from "./module/cardsBeach.js";
import { pointsMapFunc } from "./module/pointsMap.js";
import { serviceAirplaneBannerFunc } from "./module/serviceAirplaneBanner.js";
import { serviceSleepBannerFunc } from "./module/serviceSleepBanner.js";
import { shopBannerFunc } from "./module/shopBanner.js";
import { headerBtnNavFunc } from "./module/Utils/HeaderBtn.js";
import { dropMenuHeaderFunc } from "./module/dropMenuHeader.js";
import { orderServiceWindowFunc } from "./module/orderServiceWindow.js";

window.onload = () => {
  const loadingElem = document.getElementsByClassName("section_load")[0];
  loadingElem.style = `opacity: 0;`;

  bannerMainFunc();
  dropMenuHeaderFunc();
  headerBtnNavFunc();
  pointsMapFunc();
  cardsBeachFunc();
  serviceAirplaneBannerFunc();
  serviceSleepBannerFunc();
  shopBannerFunc();
  orderServiceWindowFunc()
  
  setTimeout(() => {
    loadingElem.remove();
    document.body.style = "overflow: scroll";
  }, 1000);
};
