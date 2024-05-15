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

    for (
      let index = 0;
      index < SleepSlider.itemSlide.serviceArray.length;
      index += 2
    ) {
      let elem = [
        SleepSlider.itemSlide.serviceArray[index],
        SleepSlider.itemSlide.serviceArray[index + 1],
      ];
      let description = [elem[0].description, elem[1].description];

      description = description.map((item, i) => {
        let format = item;
        if (typeof item === "number") {
          if (SleepSlider.itemSlide.serviceArray.length - 1 === index + i) {
            price += item;
            format = intlObj.NumberFormat("en-EN").format(price);
          } else
            format = intlObj.NumberFormat("en-EN").format(elem[i].description);
        }
        if (elem[i]?.after) format += " " + elem[i].after;
        if (elem[i]?.servicePrice) {
          price += elem[i].servicePrice * item;
          elem[i].navArrow = `
        <div class="container_btn_service">
            <button id="btn_minus_service_${index}" class="btn_plane_service">
                <img class="icon" src="./img/icon/minus-button_7263344.png" />
            </button>
            <button id="btn_plus_service_${
              index + 1
            }" class="btn_plane_service">
                <img class="icon" src="./img/icon/plus_1828925.png" />
            </button>
        </div>`;
        }
        return format;
      });
      containerServiceElem.insertAdjacentHTML(
        "beforeend",
        `
        <div class="container_item_plane">
          <div class="item_plane">
              <h4 class="upper_text prev_text">${elem[0].category}</h4>
              <div>
                  <h2 class="upper_text">${description[0]}</h2>
                  ${elem[0]?.navArrow ? elem[0]?.navArrow : ""} 
              </div>
          </div>
          <div class="item_plane">
          <h4 class="upper_text prev_text">${elem[1].category}</h4>
          <div>
              <h2 class="upper_text">${description[1]}</h2>
              ${elem[1]?.navArrow ? elem[1]?.navArrow : ""} 
          </div>
      </div>
        </div>
        `
      );
      elem.forEach((elem, i) => {
        if (elem?.navArrow) {
          const btnMinus = document.getElementById(
            `btn_minus_service_${index}`
          );
          btnMinus.onclick = () => {
            const elem =
              SleepSlider.itemSlide.serviceArray[index + i].description;
            if (elem - 1 > 0)
              SleepSlider.itemSlide.serviceArray[index + i].description -= 1;
            SleepSlider.render();
          };
          const btnPlus = document.getElementById(
            `btn_plus_service_${index + 1}`
          );
          btnPlus.onclick = () => {
            const elem =
              SleepSlider.itemSlide.serviceArray[index + i].description;
            if (elem - 1 < 15)
              SleepSlider.itemSlide.serviceArray[index + i].description += 1;
            SleepSlider.render();
          };
        }
      });
    }
  }

  SleepSlider.attenuationSlide();
  SleepSlider.render();
};
