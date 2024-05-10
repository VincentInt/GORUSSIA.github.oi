import { searchCityCoordApi } from "./Utils/locationUtils.js";
import slidesBaseArray from "./data/Header.json" assert { type: "json" };

export const bannerMainFunc = () => {
  let indexSlide = 0;
  let stateItem = document.getElementById(`line_state_slider_${indexSlide}`);
  let stateTime = null;
  const sectionBannerElem = document.getElementById("section_banner");
  const slidesStateElem = document.getElementById("container_slides_state");
  const bannerImgElem = document.getElementById("banner_img");
  const cityBannerTextElem = document.getElementById("city_banner_text");
  const uniquenessBannerTextElem = document.getElementById(
    "uniqueness_banner_text"
  );
  const locationCityElem = document.getElementsByClassName("location_city");
  const daysElem = document.getElementsByClassName("days");
  const monthElem = document.getElementsByClassName("month");
  const yearsElem = document.getElementsByClassName("years");
  const leftBannerBtnElem = document.getElementById("left_banner_btn");
  const rigthBannerBtnElem = document.getElementById("rigth_banner_btn");

  leftBannerBtnElem.onclick = () => moveBanner(false);
  rigthBannerBtnElem.onclick = () => moveBanner(true);

  function moveBanner(direction) {
    direction ? (indexSlide += 1) : (indexSlide -= 1);

    if (indexSlide > slidesBaseArray.length - 1) indexSlide = 0;
    if (indexSlide < 0) indexSlide = slidesBaseArray.length - 1;

    renderSlideBanner(slidesBaseArray[indexSlide]);
  }
  function renderSlideBanner(slideItem = slidesBaseArray[0]) {
    sectionBannerElem.style = "transition: opacity 0.4s ease-in; opacity: 0;";
    bannerImgElem.style = "transition: opacity 0.4s ease-in; opacity: 0;";

    clearTimeout(stateTime);
    setTimeout(() => {
      bannerImgElem.src = slideItem.img;
      cityBannerTextElem.innerText = slideItem.city;
      uniquenessBannerTextElem.innerText = slideItem.uniqueness;

      sectionBannerElem.style =
        "transition: opacity 0.5s ease-out; opacity: 100;";
      bannerImgElem.style = "transition: opacity 0.5s ease-out; opacity: 100;";
      moveStateBanner();
    }, 500);
  }
  function renderSlidesStateBanner() {
    slidesBaseArray.forEach((elem, index) => {
      const indexSlide = index + 1;
      slidesStateElem.insertAdjacentHTML(
        "beforeend",
        `
      <div class="item_slide">
        <div class="line"><div id="line_state_slider_${index}"></div></div>
        <div class="container_text">
          <h3 class="number_slide_text">${
            indexSlide < 10 ? `0${indexSlide}` : index
          }</h3>
          <h4 class="name_slide_text">${elem.terrain}</h4>
        </div>
      </div>`
      );
    });
  }
  function moveStateBanner() {
    if (stateItem?.classList) stateItem.className = "";
    stateItem = document.getElementById(`line_state_slider_${indexSlide}`);
    stateItem.classList = "inside_line";

    stateTime = setTimeout(() => {
      moveBanner(true);
    }, 5000);
  }
  async function getCityUsers(lat, long) {
    const cityLocation = await searchCityCoordApi(lat, long);

    [...locationCityElem].forEach(
      (elem) => (elem.innerText = cityLocation.address.state)
    );
  }
  function getGeolocation() {
    const showGeolocation = (show) => {
      const { latitude, longitude } = show.coords;
      getCityUsers(latitude, longitude);
    };
    const errorGeolocation = (error) => {
      console.error(error.messege);
    };
    navigator.geolocation.getCurrentPosition(showGeolocation, errorGeolocation);
  }
  function getTimeZone() {
    const dateObj = new Date();

    let day = JSON.stringify(dateObj.getDate());
    let month = JSON.stringify(dateObj.getMonth() + 1);
    let years = JSON.stringify(dateObj.getFullYear()).slice(2);
    
    day < 10 ? (day = `0${day}`) : false;
    month < 10 ? (month = `0${month}`) : false;

    [...daysElem].forEach((elem) => (elem.innerText = day));
    [...monthElem].forEach((elem) => (elem.innerText = month));
    [...yearsElem].forEach((elem) => (elem.innerText = years));
  }
  renderSlidesStateBanner();
  renderSlideBanner();
  getGeolocation();
  getTimeZone();
};
