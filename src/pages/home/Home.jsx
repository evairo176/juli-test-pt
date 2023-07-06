import React, { useEffect, useState } from "react";
import "../home/home.css";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/action/globalAction";

const API_KEY = "960ecb7a113224110c918af38166f74a";

function Home() {
  const [forecast, setForecast] = useState([]);
  const dispatch = useDispatch();
  const storeData = useSelector((store) => store?.global);
  const { isData } = storeData;

  useEffect(() => {
    fetchWeatherForecast();
  }, []);

  const fetchWeatherForecast = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=Jakarta&appid=${API_KEY}&units=metric&cnt=40`
      );

      const data = await response.json();

      dispatch(setData(data));

      const dailyForecast = extractDailyForecast(data.list);
      setForecast(dailyForecast);
    } catch (error) {
      console.log("Error fetching weather forecast:", error);
    }
  };

  const extractDailyForecast = (forecastList) => {
    const dailyForecast = [];
    const uniqueDates = [];

    forecastList.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];

      if (!uniqueDates.includes(date)) {
        uniqueDates.push(date);
        dailyForecast.push(item);
      }
    });

    return dailyForecast;
  };

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
      <h1>Weather Forecast for Jakarta</h1>
      <ul>
        {forecast.map((item) => (
          <li key={item.dt}>
            {`${item.dt_txt}: ${item.main.temp}°C - ${item.weather[0].description}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
