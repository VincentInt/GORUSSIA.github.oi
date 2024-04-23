const pointBaseArray = [
  { city: "Москва", top: 38, left: 13.5 },
  { city: "Краснодар", top: 55, left: 4 },
  { city: "Сочи", top: 57, left: 2 },
  { city: "Севастополь", top: 47.5, left: -1 },
  { city: "Калининград", top: 23, left: 4 },
  { city: "Чебоксары", top: 37, left: 20 },
  { city: "Астрахань", top: 58, left: 9 },
  { city: "Иркутск", top: 70, left: 58 },
  { city: "Санкт-Петербург", top: 24, left: 17.5 },
  { city: "Владивосток", top: 76, left: 86.5 },
  { city: "Казань", top: 47.5, left: 15 },
  { city: "Екатеринбург", top: 52.5, left: 25 },
  { city: "Якутия", top: 33.5, left: 77 },
  { city: "Новосибирск", top: 60.5, left: 42 },
  { city: "Сахалин", top: 55.5, left: 90 },
];
export const pointsMapFunc = () => {
  const USER_KEY_WEATHER_API = "aa78c371f61da4559495da8ca2eeca61";
  const SEARCH_CITY_WEATHER_API =
    "http://api.openweathermap.org/geo/1.0/direct";
  const INFO_WEATHER_CITY_WEATHER_API =
    "https://api.openweathermap.org/data/2.5/weather";
  let currentPoint = null;
  const getsWeatherObj = {};
  const mapPointsElem = document.getElementById("map_points");

  async function infoHoverPoint(pointItem) {
    if ((currentPoint != pointItem) & !document.getElementById("info_point")) {
      const itemWeather = await getWeatherInfoCity(pointItem);

      mapPointsElem.insertAdjacentHTML(
        "afterbegin",
        `<div style="top:${pointItem.top - 13}%; left:${
          pointItem.left
        }%;" id="info_point" class="container_info_point">
            <h2 class="info_text">${pointItem.city}</h2>
            <div class="container_info">
                <div>
                  <div class="container_point_icon">
                    <img class="icon point_icon" src="./img/icon/thermometer-half_5070429.png" alt="temp_logo"/>
                  </div>
                    <h5>${itemWeather.temp}°C</h5>
                </div>
                <div>
                  <div class="container_point_icon">
                    <img class="icon point_icon" src="./img/icon/cloud-showers-heavy_6853872.png" alt="rain_logo"/>
                  </div>
                    <h5>${itemWeather.clouds}%</h5>
                </div>
                <div>
                  <div class="container_point_icon">
                    <img class="icon point_icon" src="./img/icon/wind_5070417.png" alt="wind_logo"/>
                  </div>
                    <h5>${itemWeather.wind}м/с</h5>
                </div>
            </div>
        </div>`
      );
      currentPoint = pointItem;
    }
  }
  function renderPoints() {
    pointBaseArray.forEach((elem, index) => {
      mapPointsElem.insertAdjacentHTML(
        "beforeend",
        `<div id="point_${index}" style="top:${elem.top}%; left:${elem.left}%;" class="container_point">
            <div class="point_map"></div>
            <h4>${elem.city}</h4>
         </div>`
      );
      const pointElem = document.getElementById(`point_${index}`);
      pointElem.onmouseover = () => infoHoverPoint(elem);
      pointElem.onmouseout = () => {
        document.getElementById("info_point")?.remove();
        currentPoint = null;
      };
    });
  }
  async function getWeatherInfoCity(item) {
    if (getsWeatherObj[item.city]) return getsWeatherObj[item.city];

    const cityItem = await fetch(
      `${SEARCH_CITY_WEATHER_API}?q=${item.city}&limit=1&appid=${USER_KEY_WEATHER_API}`
    )
      .then((res) => res.json())
      .then((json) => json[0])
      .catch((err) => console.error(err));
    const cityWeatherItem = await fetch(
      `${INFO_WEATHER_CITY_WEATHER_API}?lat=${cityItem.lat}&lon=${cityItem.lon}&appid=${USER_KEY_WEATHER_API}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => json)
      .catch((err) => console.error(err));
    return (getsWeatherObj[item.city] = {
      temp: cityWeatherItem.main.temp,
      clouds: cityWeatherItem.clouds.all,
      wind: cityWeatherItem.wind.speed,
    });
  }
  renderPoints();
};
