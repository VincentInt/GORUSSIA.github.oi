import airplaneServiceBase from "./data/Airplane.json"  with { type: 'json' };
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
      for (
        let index = 0;
        index < AirplaneSlider.itemSlide.serviceArray.length;
        index += 2
      ) {
        let elem = [
          AirplaneSlider.itemSlide.serviceArray[index],
          AirplaneSlider.itemSlide.serviceArray[index + 1],
        ];
        let description = [elem[0].description, elem[1].description];
        description = description.map((item, index) => {
          let formater;
          if (typeof item === "number")
            formater = intlObj.NumberFormat("en-EN").format(item);
          if (elem[index].after !== undefined)
            return (formater += " " + elem[index].after);
          else return item;
        });
        AirplaneSlider.cotnainerSlider.insertAdjacentHTML(
          "beforeend",
          `
          <div class="container_item_plane">
            <div class="item_plane">
                <h4 class="upper_text prev_text">${elem[0].category}</h4>
                <h2 class="upper_text">${description[0]}</h2>
            </div>
            <div class="item_plane">
              <h4 class="upper_text prev_text">${elem[1].category}</h4>
              <h2 class="upper_text">${description[1]}</h2>
            </div>
          </div>
          `
        );
      }
    } else {
      await calculateDistance(renderService, AirplaneSlider.itemSlide);
    }
  }
  AirplaneSlider.attenuationSlide();
  AirplaneSlider.render();
};
