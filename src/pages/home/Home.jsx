import React, { useEffect, useState } from "react";

const API_KEY = "960ecb7a113224110c918af38166f74a";

function Home() {
  const [weatherForecast, setWeatherForecast] = useState([]);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/forecast?q=Jakarta,id&appid=${API_KEY}`
        );
        const data = await response.json();

        const forecasts = data.list;
        const weatherData = {};

        forecasts.forEach((forecast) => {
          const date = forecast.dt_txt.split(" ")[0];
          const temperature = forecast.main.temp;

          if (!(date in weatherData)) {
            weatherData[date] = temperature;
          }
        });

        const forecastList = Object.entries(weatherData).map(
          ([date, temperature]) => ({
            date,
            temperature,
          })
        );

        setWeatherForecast(forecastList);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchWeatherForecast();
  }, []);

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const renderNumber = (number) => {
    if (number % 3 === 0 && number % 5 === 0) {
      return "FooBar";
    } else if (number % 3 === 0) {
      return "Foo";
    } else if (number % 5 === 0) {
      return "Bar";
    } else if (isPrime(number)) {
      return "";
    } else {
      return number.toString();
    }
  };

  const isPrime = (number) => {
    if (number < 2) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) return false;
    }
    return true;
  };

  const printOutput = () => {
    let output = "";
    for (let i = numbers.length - 1; i >= 0; i--) {
      const number = numbers[i];
      output += renderNumber(number) + "\t";
      if (i % 10 === 0) {
        console.log(output);
        output = "";
      }
    }
    // Print remaining numbers
    console.log(output);
  };

  // Print output to console
  printOutput();

  return (
    <div>
      <h1>Ramalan Cuaca Jakarta untuk 5 hari ke depan:</h1>
      <ul>
        {weatherForecast
          ? weatherForecast.map((forecast) => (
              <li key={forecast.date}>
                {forecast.date}: {forecast.temperature} K
              </li>
            ))
          : "sorry we not have data"}
      </ul>
    </div>
  );
}

export default Home;
