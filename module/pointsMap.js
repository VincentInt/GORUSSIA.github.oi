import {
  searchCityCoordApi,
  searchCityNameApi,
} from "./Utils/locationUtils.js";
import pointBaseArray from "./data/PointMap.json"  with { type: 'json' };

export const pointsMapFunc = () => {
  const USER_KEY_WEATHER_API = "aa78c371f61da4559495da8ca2eeca61";
  const INFO_WEATHER_CITY_WEATHER_API =
    "https://api.openweathermap.org/data/2.5/weather";
  let currentPoint = null;
  const getsWeatherObj = {};
  const mapPointsElem = document.getElementById("map_points");
  const titleMyLocationElem = document.getElementById("title_location_map");

  mapPointsElem.onclick = () => removeInfoPoints();

  async function infoHoverPoint(elem, pointItem) {
    if ((currentPoint != elem) & !document.getElementById("info_point")) {
      const itemWeather = await getWeatherInfoCity(elem);
      pointItem.insertAdjacentHTML(
        "afterbegin",
        `<div id="info_point" class="container_info_point">
            <h2 class="info_text">${elem.city}</h2>
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
      currentPoint = elem;
    }
  }
  function renderPoints() {
    const renderMyLocation = async (coord) => {
      const coords = coord.coords;

      const cityLocation = await searchCityCoordApi(
        coords.latitude,
        coords.longitude
      );

      titleMyLocationElem.innerText = `- ${cityLocation.address.state}`;
    };
    navigator.geolocation.getCurrentPosition(renderMyLocation, (err) =>
      console.error(err)
    );

    pointBaseArray.forEach((elem, index) => {
      mapPointsElem.insertAdjacentHTML(
        "beforeend",
        `<div class="container_poin_info" id="point_${index}" style="top:${elem.top}%; left:${elem.left}%;">
          <div class="container_point">
            <div class="point_map"></div>
            <h4 class="point_text">${elem.city}</h4>
          </div>
         </div>`
      );
      const pointElem = document.getElementById(`point_${index}`);

      pointElem.onfocus = () => infoHoverPoint(elem, pointElem);
      pointElem.onblur = () => removeInfoPoints();
      pointElem.onmouseenter = () => infoHoverPoint(elem, pointElem);
      pointElem.onmouseleave = () => removeInfoPoints();
    });
  }
  function removeInfoPoints() {
    document.getElementById("info_point")?.remove();
    currentPoint = null;
  }
  async function getWeatherInfoCity(item) {
    if (getsWeatherObj[item.city]) return getsWeatherObj[item.city];

    const cityItem = await searchCityNameApi(item.city);
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
