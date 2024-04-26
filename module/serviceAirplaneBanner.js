import { calculateDistance } from "./Utils/locationUtils.js";

const airplaneServiceBase = {
  banner: [
    {
      airportName: "Международный аэропорт Симферополь имени И.К. Айвазовского",
      img: "./img/Аэропорт_Симферополь.jpg",
      render: false,
      serviceAirplane: [
        {
          category: "Место прибытия",
          description: "Симферополь",
        },
        { category: "Дистанция", description: 1050, after: "Км" },
        {
          category: "Время в пути",
          description: "4 часа 50 минут",
        },
        { category: "Стоимость", description: 50000, after: "Руб" },
      ],
    },
    {
      airportName: "Международный аэропорт Краснодар имени Екатерины II",
      img: "./img/scale_1200.png",
      render: false,
      city: "Краснодар",
      serviceAirplane: [
        {
          category: "Место прибытия",
          description: "Краснодар",
        },
        { category: "Дистанция", description: 1050, after: "Км" },
        {
          category: "Время в пути",
          description: "4 часа 50 минут",
        },
        { category: "Стоимость", description: 60000, after: "Руб" },
      ],
    },
    {
      airportName: "Международный аэропорт Домоде́дово имени М. В. Ломоносова",
      img: "./img/756493217026772.jpg",
      render: false,
      serviceAirplane: [
        {
          category: "Место прибытия",
          description: "Москва",
        },
        { category: "Дистанция", description: 1050, after: "Км" },
        {
          category: "Время в пути",
          description: "4 часа 50 минут",
        },
        { category: "Стоимость", description: 60000, after: "Руб" },
      ],
    },
    {
      airportName: "Международный аэропорт Пулково в Санкт-Петербурге",
      img: "./img/241ab8f0194549328ee28157476592fd.jpeg",
      render: false,
      serviceAirplane: [
        {
          category: "Место прибытия",
          description: "Санкт-Петербург",
        },
        { category: "Дистанция", description: 1050, after: "Км" },
        {
          category: "Время в пути",
          description: "4 часа 50 минут",
        },
        { category: "Стоимость", description: 60000, after: "Руб" },
      ],
    },
    {
      airportName: "Аэропорт Казань им. Габдуллы Тукая",
      img: "./img/0.934863001606908602.jpg",
      render: false,
      serviceAirplane: [
        {
          category: "Место прибытия",
          description: "Казань",
        },
        { category: "Дистанция", description: 1050, after: "Км" },
        {
          category: "Время в пути",
          description: "4 часа 50 минут",
        },
        { category: "Стоимость", description: 60000, after: "Руб" },
      ],
    },
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
    setTimeout(() => renderService(), 500);
  }
  function renderSlide() {
    containerSliderElem.style = "transition: opacity 0.5s ease-in; opacity: 0;";
    setTimeout(() => {
      slideImgElem.src = `${airplaneServiceBase.banner[indexSlide].img}`;
      nameSlideElem.innerText = `${airplaneServiceBase.banner[indexSlide].airportName}`;

      containerSliderElem.style =
        "transition: opacity 0.5s ease-in; opacity: 100;";
    }, 500);
  }
  async function renderService() {
    const bannerElem = airplaneServiceBase.banner[indexSlide];
    containerServiceElem.innerHTML = "";
    if (bannerElem.render) {
      bannerElem.serviceAirplane.forEach((elem) => {
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
    } else {
      await calculateDistance(renderService, bannerElem);
    }
  }
  renderSlide();
  renderService();
};
