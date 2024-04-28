import sleepServiceBase from "./data/Sleep.json" assert { type: "json" };
import { MainSliderUtils } from "./Utils/SliderUtils.js";

export const serviceSleepBannerFunc = () => {
  const intlObj = Intl;

  const containerSliderElem = document.getElementById(
    "container_slider_service_sleep"
  );
  const containerServiceElem = document.getElementById(
    "container_service_plane_sleep"
  );
  const slideImgElem = document.getElementById("img_slide_servise_sleep");
  const nameSlideElem = document.getElementById("service_sleep_name_resort");

  const leftArrowElem = document.getElementById("btn_left_arrow_service_sleep");
  const rigthArrowElem = document.getElementById(
    "btn_rigth_arrow_service_sleep"
  );

  const SleepSlider = new MainSliderUtils(
    leftArrowElem,
    rigthArrowElem,
    containerSliderElem,
    containerServiceElem,
    slideImgElem,
    nameSlideElem,
    sleepServiceBase,
    renderService
  );
  function renderService() {
    let price = 0;
    
    SleepSlider.cotnainerSlider.innerHTML = "";
    SleepSlider.itemSlide.serviceArray.forEach((elem, index) => {
      let description = elem.description;
      let navService = "";

      if (typeof elem.description === "number") {
        if (SleepSlider.itemSlide.serviceArray.length - 1 === index) {
          price += elem.description;
          description = intlObj.NumberFormat("en-EN").format(price);
        } else
          description = intlObj.NumberFormat("en-EN").format(elem.description);
      }
      if (elem.after !== undefined) description += " " + elem.after;
      if (elem.servicePrice !== undefined) {
        price += elem.servicePrice * elem.description;
        navService = `
        <div class="container_btn_service">
            <button id="btn_minus_service_${index}" class="btn_plane_service">
                <img class="icon" src="./img/icon/minus-button_7263344.png" />
            </button>
            <button id="btn_plus_service_${index}" class="btn_plane_service">
                <img class="icon" src="./img/icon/plus_1828925.png" />
            </button>
        </div>`;
      }
      containerServiceElem.insertAdjacentHTML(
        "beforeend",
        `
            <div class="item_plane">
                <h4 class="upper_text prev_text">${elem.category}</h4>
                <div>
                    <h2 class="upper_text">${description}</h2>
                    ${navService} 
                </div>
            </div>
            `
      );
      if (navService) {
        const btnMinus = document.getElementById(`btn_minus_service_${index}`);
        btnMinus.onclick = () => {
          const elem = SleepSlider.itemSlide.serviceArray[index].description;
          if (elem - 1 > 0)
            SleepSlider.itemSlide.serviceArray[index].description = elem - 1;
          SleepSlider.render();
        };
        const btnPlus = document.getElementById(`btn_plus_service_${index}`);
        btnPlus.onclick = () => {
          SleepSlider.itemSlide.serviceArray[index].description += 1;
          SleepSlider.render();
        };
      }
    });
  }

  SleepSlider.attenuationSlide();
  SleepSlider.render();
};
