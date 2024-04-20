const airplaneServiceBase = {
  banner: [
    {
      airportName: "Международный аэропорт Симферополь имени И.К. Айвазовского",
      img: "./img/Аэропорт_Симферополь.jpg",
    },
    {
      airportName: "Международный аэропорт Краснодар имени Екатерины II",
      img: "./img/original.jpg",
    },
  ],
  serviceAirplane: [
    {
      category: "Место прибытия",

      description: "Аэропорт Севастополя",
    },
    { category: "Дистанция", description: 1050, after: "Км" },
    {
      category: "Время в пути",
      description: "4 часа 50 минут",
    },
    { category: "Стоимость", description: 50000, after: "Руб" },
  ],
};
export const serviceAirplaneBannerFunc = () => {
  let indexSlide = 0;
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

  leftArrowElem.onclick = () => moveSlide(false);
  rigthArrowElem.onclick = () => moveSlide(true);

  function moveSlide(move) {
    move ? (indexSlide += 1) : (indexSlide -= 1);
    if (indexSlide < 0) indexSlide = airplaneServiceBase.banner.length - 1;
    if (indexSlide >= airplaneServiceBase.banner.length) indexSlide = 0;
    renderSlide();
  }
  function renderSlide() {
    containerSliderElem.style = "transition: opacity 0.4s ease-in; opacity: 0;";
    setTimeout(() => {
      slideImgElem.src = `${airplaneServiceBase.banner[indexSlide].img}`;
      nameSlideElem.innerText = `${airplaneServiceBase.banner[indexSlide].airportName}`;

      containerSliderElem.style =
        "transition: opacity 0.4s ease-in; opacity: 100;";
    }, 500);
  }
  function renderService() {
    airplaneServiceBase.serviceAirplane.forEach((elem) => {
      let description = elem.description;
      if (typeof elem.description === "number")
        description = intlObj.NumberFormat("en-EN").format(elem.description);
      if (elem.after !== undefined) description += " " + elem.after;
      containerServiceElem.insertAdjacentHTML(
        "beforeend",
        `
            <div class="item_plane">
                <h4 class="upper_text prev_text">${elem.category}</h4>
                <h2 class="upper_text">${description}</h2>
            </div>
          `
      );
    });
  }
  renderSlide();
  renderService();
};
