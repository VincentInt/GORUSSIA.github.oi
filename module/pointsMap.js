const pointBaseArray = [
  { city: "Москва", top: 38, left: 13.5 },
  { city: "Краснодар", top: 55, left: 4 },
];
export const pointsMapFunc = () => {
  let currentPoint = null;
  const mapPointsElem = document.getElementById("map_points");

  function infoHoverPoint(pointItem) {
    if (currentPoint != pointItem) {
      mapPointsElem.insertAdjacentHTML(
        "afterbegin",
        `<div style="top:${pointItem.top - 17}%; left:${
          pointItem.left - 4
        }%;" id="info_point" class="container_info_point">
            <h2 class="info_text">${pointItem.city}</h2>
            <h3 class="info_text">UTC:0 20:40</h3>
            <div class="container_info">
                <div>
                    <img class="icon point_icon" src="/img/icon/thermometer-half_5070429.png" alt="rain_logo"/>
                    <h5>9-13</h5>
                </div>
                <div>
                    <img class="icon point_icon" src="/img/icon/cloud-showers-heavy_6853872.png" alt="rain_logo"/>
                    <h5>9-13</h5>
                </div>
                <div>
                    <img class="icon point_icon" src="/img/icon/wind_5070417.png" alt="rain_logo"/>
                    <h5>9-13</h5>
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
    });
  }
  renderPoints();
};
