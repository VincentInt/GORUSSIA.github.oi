import { searchCityApi } from "./Utils/locationUtils.js";
import pointBaseArray from "./data/PointMap.json" assert {type: "json"}
export const pointsMapFunc = () => {
  const USER_KEY_WEATHER_API = "aa78c371f61da4559495da8ca2eeca61";
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
        `<div style="top:${pointItem.top - 19}%; left:${
          pointItem.left
        }%;" id="info_point" class="container_info_point">
            <h2 class="info_text">${pointItem.city}</h2>
            <div class="container_info">
                <div class="item_info">
                  <div class="container_point_icon">
                    <img class="icon point_icon" src="./img/icon/thermometer-half_5070429.png" alt="temp_logo"/>
                  </div>
                    <h5>${itemWeather.temp}°C</h5>
                </div>
                <div  class="item_info">
                  <div class="container_point_icon">
                    <img class="icon point_icon" src="./img/icon/cloud-showers-heavy_6853872.png" alt="rain_logo"/>
                  </div>
                    <h5>${itemWeather.clouds}%</h5>
                </div>
                <div  class="item_info">
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

    const cityItem = await searchCityApi(item.city)
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
