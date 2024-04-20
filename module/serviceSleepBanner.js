const sleepServiceBase = {
  banner: [
    {
      resortName: "Международный аэропорт Симферополь имени И.К. Айвазовского",
      img: "./img/Аэропорт_Симферополь.jpg",
    },
    {
      resortName: "Международный аэропорт Краснодар имени Екатерины II",
      img: "./img/original.jpg",
    },
  ],
  serviceSleep: [
    {
      category: "Курорт",
      description: "Аэропорт Севастополя",
    },
    { category: "Ночей", servicePrice: 18000, description: 1, after: "Ночь" },
    {
      category: "Гостей",
      servicePrice: 2000,
      description: 1,
      after: "гостей",
    },
    { category: "Стоимость", description: 50000, after: "Руб" },
  ],
};
export const serviceSleepBannerFunc = () => {
  let indexSlide = 0;
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

  leftArrowElem.onclick = () => moveSlide(false);
  rigthArrowElem.onclick = () => moveSlide(true);

  function moveSlide(move) {
    move ? (indexSlide += 1) : (indexSlide -= 1);
    if (indexSlide < 0) indexSlide = sleepServiceBase.banner.length - 1;
    if (indexSlide >= sleepServiceBase.banner.length) indexSlide = 0;
    renderSlide();
  }
  function renderSlide() {
    containerSliderElem.style = "transition: opacity 0.4s ease-in; opacity: 0;";
    setTimeout(() => {
      slideImgElem.src = `${sleepServiceBase.banner[indexSlide].img}`;
      nameSlideElem.innerText = `${sleepServiceBase.banner[indexSlide].resortName}`;

      containerSliderElem.style =
        "transition: opacity 0.4s ease-in; opacity: 100;";
    }, 500);
  }
  function renderService() {
    containerServiceElem.innerHTML = "";

    let price = 0;

    sleepServiceBase.serviceSleep.forEach((elem, index) => {
      let description = elem.description;
      let navService = null;

      if (typeof elem.description === "number") {
        if (sleepServiceBase.serviceSleep.length - 1 === index) {
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
        document.getElementById(`btn_minus_service_${index}`).onclick = () => {
          const elem = sleepServiceBase.serviceSleep[index].description;
          if (elem - 1 > 0)
            sleepServiceBase.serviceSleep[index].description = elem - 1;
          renderService();
        };
        document.getElementById(`btn_plus_service_${index}`).onclick = () => {
          sleepServiceBase.serviceSleep[index].description += 1;
          renderService();
        };
      }
    });
  }
  renderSlide();
  renderService();
};
