import { bannerMainFunc } from "./module/headerBanner.js";
import { cardsBeachFunc } from "./module/cardsBeach.js";
import { pointsMapFunc } from "./module/pointsMap.js";
import { serviceAirplaneBannerFunc } from "./module/serviceAirplaneBanner.js";
import { serviceSleepBannerFunc } from "./module/serviceSleepBanner.js";
import { shopBannerFunc } from "./module/shopBanner.js";
import { headerBtnNav } from "./module/Utils/HeaderBtn.js";
import { dropMenuHeaderFunc } from "./module/dropMenuHeader.js";

window.onload = () => {
  const loadingElem = document.getElementById("section_load");
  loadingElem.style = `opacity: 0;`;

  bannerMainFunc();
  dropMenuHeaderFunc();
  headerBtnNav();
  pointsMapFunc();
  cardsBeachFunc();
  serviceAirplaneBannerFunc();
  serviceSleepBannerFunc();
  shopBannerFunc();
  
  setTimeout(() => {
    loadingElem.remove();
    document.body.style = "overflow: scroll";
  }, 1000);
};
