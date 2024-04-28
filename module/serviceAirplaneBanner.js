import airplaneServiceBase from "./data/Airplane.json" assert { type: "json" };
import { calculateDistance } from "./Utils/locationUtils.js";
import { MainSliderUtils } from "./Utils/SliderUtils.js";

export const serviceAirplaneBannerFunc = () => {
  const intlObj = Intl;

  const containerSliderElem = document.getElementById(
    "container_slider_service_airplane"
  );
  const containerServiceElem = document.getElementById(
    "container_service_plane_airplane"
  );
  const slideImgElem = document.getElementById("img_slide_servise_airplane");
  const nameSlideElem = document.getElementById(
    "service_airplane_name_airport"
  );
  const leftArrowElem = document.getElementById(
    "btn_left_arrow_service_airplane"
  );
  const rigthArrowElem = document.getElementById(
    "btn_rigth_arrow_service_airplane"
  );

  const AirplaneSlider = new MainSliderUtils(
    leftArrowElem,
    rigthArrowElem,
    containerSliderElem,
    containerServiceElem,
    slideImgElem,
    nameSlideElem,
    airplaneServiceBase,
    renderService
  );
  async function renderService() {
    AirplaneSlider.cotnainerSlider.innerHTML = "";

    if (AirplaneSlider.itemSlide.render) {
      AirplaneSlider.itemSlide.serviceArray.forEach((elem) => {
        let description = elem.description;
        if (typeof elem.description === "number")
          description = intlObj.NumberFormat("en-EN").format(elem.description);
        if (elem.after !== undefined) description += " " + elem.after;
        AirplaneSlider.cotnainerSlider.insertAdjacentHTML(
          "beforeend",
          `
            <div class="item_plane">
                <h4 class="upper_text prev_text">${elem.category}</h4>
                <h2 class="upper_text">${description}</h2>
            </div>
          `
        );
      });
    } else {
      await calculateDistance(renderService, AirplaneSlider.itemSlide);
    }
  }
  AirplaneSlider.attenuationSlide();
  AirplaneSlider.render();
};
