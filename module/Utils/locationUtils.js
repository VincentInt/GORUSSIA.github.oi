export const searchCityApi = async (cityName) => {
  const USER_KEY_WEATHER_API = "aa78c371f61da4559495da8ca2eeca61";
  const SEARCH_CITY_WEATHER_API =
    "http://api.openweathermap.org/geo/1.0/direct";
  const cityItem = await fetch(
    `${SEARCH_CITY_WEATHER_API}?q=${cityName}&limit=1&appid=${USER_KEY_WEATHER_API}`
  )
    .then((res) => res.json())
    .then((json) => json[0])
    .catch((err) => console.error(err));
  return cityItem;
};
export const calculateDistance = async (renderFunc, bannerObj) => {
  let distance = null;
  const earthRadius = 6371;
  
  const whereCity = await searchCityApi(
    bannerObj.city
  );

  navigator.geolocation.getCurrentPosition(longDistance, err);
  function longDistance({ coords }) {
    function toRadians(degrees) {
      return degrees * (Math.PI / 180);
    }
    const cities = {
      myCity: {
        lat: toRadians(coords.latitude),
        lon: toRadians(coords.longitude),
      },
      whereCity: {
        lat: toRadians(whereCity.lat),
        lon: toRadians(whereCity.lon),
      },
    };
    cities.differenceLat = cities.myCity.lat - cities.whereCity.lat;
    cities.differenceLon = cities.myCity.lon - cities.whereCity.lon;
    const gaversinusesDifference =
      Math.sin(cities.differenceLat / 2) * Math.sin(cities.differenceLat / 2) +
      Math.cos(cities.myCity.lat) *
        Math.cos(cities.whereCity.lat) *
        Math.sin(cities.differenceLon / 2) *
        Math.sin(cities.differenceLon / 2);
    const centralAngle =
      2 *
      Math.atan2(
        Math.sqrt(gaversinusesDifference),
        Math.sqrt(1 - gaversinusesDifference)
      );
    distance = Math.ceil(earthRadius * centralAngle);
    const serviceArray = bannerObj.serviceArray
    serviceArray[1].description = distance;
    serviceArray[2].description = getTime(distance);
    serviceArray[3].description = Math.ceil(distance * 50);
    bannerObj.render = true;
    renderFunc();
  }

  function err(error) {
    console.error(error);
  }

  function getTime(distance) {
    const cheackAfterMinutes = (minutes) => {
      if (minutes[minutes.length - 1] >= 5) return (minutes += " минут");
      if (minutes[minutes.length - 1] == 1) return (minutes += " минута");
      else if (minutes[minutes.length - 1] <= 4) return (minutes += " минуты");
    };
    const cheackAfterHour = (hour) => {
      if (hour[hour.length - 1] >= 5) return (hour += " часов");
      if (hour[hour.length - 1] == 1) return (hour += " час");
      else if (hour[hour.length - 1] <= 4) return (hour += " часа");
    };

    let minutes = Math.floor((distance / 350) * 100);
    if (minutes > 60) {
      let hour = Math.floor(minutes / 60);

      minutes -= hour * 60;

      hour = JSON.stringify(hour);
      minutes = JSON.stringify(minutes);

      return cheackAfterHour(hour) + " " + cheackAfterMinutes(minutes);
    } else {
      minutes = JSON.stringify(minutes);
      return cheackAfterMinutes(minutes);
    }
  }
};
