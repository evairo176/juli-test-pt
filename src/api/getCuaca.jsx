import axios from "axios";

const getCuaca = () => {
  axios(
    "https://api.openweathermap.org/data/2.5/forecast?q=Jakarta,id&appid=960ecb7a113224110c918af38166f74a"
  )
    .then((response) => response.json())
    .then((data) => {
      const forecasts = data.list;
      const weatherForecast = {};

      forecasts.forEach((forecast) => {
        const date = forecast.dt_txt.split(" ")[0];
        const temperature = forecast.main.temp;

        if (!(date in weatherForecast)) {
          weatherForecast[date] = temperature;
        }
      });

      console.log("Ramalan Cuaca Jakarta untuk 5 hari ke depan:");
      for (const date in weatherForecast) {
        const temperature = weatherForecast[date];
        console.log(`${date}: ${temperature} K`);
      }
    })
    .catch((error) => console.log("Error:", error));
};

export { getCuaca };
