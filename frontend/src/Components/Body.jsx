import React, { useEffect, useState } from "react";
import "./Components.css";
import Box from "./Box";
import Box2 from "./Box2";
import Box3 from "./Box3";
import Days from "./Days";
import Pannel from "./Pannel";
import { get_longitude_latitude } from "../Utility/geoLocation";
import { GetDateTime } from "../Utility/DateTime";

const Body = () => {
  const [weather_data, setWeather_data] = useState({});
  const [Daily_weather, setDaily_weather] = useState({});
  const cities = [
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Kolkata",
    "Hyderabad",
  ];
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [AllCitiesWeather, setAllCitiesWeather] = useState([]);
  const [ModeOfTemp, setModeOfTemp] = useState("K");
  const [cityName, setCityName] = useState("");

  const convertTemperature = (temp, mode) => {
    if (mode === "C") {
      return (temp - 273.15).toFixed(2);
    } else if (mode === "F") {
      return (((temp - 273.15) * 9) / 5 + 32).toFixed(2);
    }
    return temp;
  };

  const fetchAllCitiesWeather = async () => {
    const weatherDataArray = await Promise.all(
      cities.map(async (city) => {
        const urlWithCityName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }`;
        const response = await fetch(urlWithCityName);
        const data = await response.json();

        data.main.temp = convertTemperature(data.main.temp, ModeOfTemp);
        data.main.temp_min = convertTemperature(data.main.temp_min, ModeOfTemp);
        data.main.temp_max = convertTemperature(data.main.temp_max, ModeOfTemp);
        data.main.feels_like = convertTemperature(
          data.main.feels_like,
          ModeOfTemp
        );

        return { city, data };
      })
    );
    setAllCitiesWeather(weatherDataArray);
    console.log("Fetched all cities weather data:", weatherDataArray);
  };

  const fetchWeatherData = async (city) => {
    const { latitude, longitude } = await get_longitude_latitude();
    console.log(latitude, longitude);
    const cityName = city;
    const urlWithCityName = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`;
    const urlWithGeoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`;
    const urlWithDailyWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`;

    try {
      const response = await fetch(city ? urlWithCityName : urlWithGeoLocation);
      const responseDaily = await fetch(urlWithDailyWeather);
      const data = await response.json();
      const Dailydata = await responseDaily.json();

      data.main.temp = convertTemperature(data.main.temp, ModeOfTemp);
      data.main.temp_min = convertTemperature(data.main.temp_min, ModeOfTemp);
      data.main.temp_max = convertTemperature(data.main.temp_max, ModeOfTemp);
      data.main.feels_like = convertTemperature(
        data.main.feels_like,
        ModeOfTemp
      );

      Dailydata.list.forEach((item) => {
        item.main.temp = convertTemperature(item.main.temp, ModeOfTemp);
        item.main.temp_min = convertTemperature(item.main.temp_min, ModeOfTemp);
        item.main.temp_max = convertTemperature(item.main.temp_max, ModeOfTemp);
        item.main.feels_like = convertTemperature(
          item.main.feels_like,
          ModeOfTemp
        );
      });

      setWeather_data(data); // Update state with fetched data
      setDaily_weather(Dailydata);
      console.log("Fetched weather data:", data); // Log the data directly after fetching
      console.log("daily Data weather data:", Dailydata); // Log the data directly after fetching
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchAllCitiesWeather();
    fetchWeatherData();

    const intervalId = setInterval(() => {
      fetchAllCitiesWeather();
      fetchWeatherData();
    }, 120000); // 120000 ms = 2 minutes

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [ModeOfTemp]);

  useEffect(() => {
    if (Object.keys(weather_data).length > 0) {
      console.log("Updated weather_data state:", weather_data);
    }
  }, [weather_data, ModeOfTemp]);

  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src="rain.mp4" type="video/mp4" />
      </video>
      <div className="border-red-500 max-w-full flex justify-center align-middle mb-3">
        <div
          className="flex flex-col justify-center align-middle mt-5 z-50 cursor-pointer border-1 items-center bg-transperent rounded-xl hover:translate-y-1 ease-in duration-100 px-8 box-shadow-transparent"
          style={{ width: "95%", height: "85vh" }}
        >
          <div className="section1 mt-5 flex">
            <ul className="flex items-center justify-between headings">
              <li className="font-medium">Weather Dashboard</li>
              <li className="flex gap-2 items-center justify-center flex-row-reverse">
                <p className="font-semibold">
                  {weather_data?.name}, {weather_data?.sys?.country} {""}
                  <span className="font-medium"> {<GetDateTime />}</span>
                </p>
                <img src="location.png" alt="" className="w-7 h-7" />
              </li>
              <li>
                <select
                  value={ModeOfTemp}
                  onChange={(e) => setModeOfTemp(e.target.value)}
                  className="custom-select text-center rounded-lg text-sm h-8 focus:outline-none p-2 input bg-transperent text-gray-800"
                >
                  <option value="C" className="bg-transperent text-gray-800">
                    Celsius
                  </option>
                  <option value="F" className="bg-transperent text-gray-800">
                    Fahrenheit
                  </option>
                  <option value="K" className="bg-transperent text-gray-800">
                    Kelvin
                  </option>
                </select>
              </li>
              {/* <li className="flex gap-2">
                <input
                  type="search"
                  placeholder="Search Places eg:Bangalore"
                  className="text-center rounded-lg text-sm h-8 focus:outline-none p-2 input"
                />
                <img
                  src="../search.png"
                  alt=""
                  className="w-8 h-8"
                  onClick={fetchWeatherData(cityName)}
                />
              </li> */}
            </ul>
          </div>
          <div className="section2 m-3 flex flex-row gap-5 max-w-full max-h-full">
            <div className="box1 flex flex-col border-blue-600 rounded-xl gap-4 size-full">
              <div
                className="innerBox1 flex border-red-400 gap-4"
                style={{ height: "30vh" }}
              >
                <Box
                  width="w-1/2"
                  current={weather_data?.main?.temp + `° ${ModeOfTemp}`}
                  minTemp={weather_data?.main?.temp_min + `° ${ModeOfTemp}`}
                  maxTemp={weather_data?.main?.temp_max + `° ${ModeOfTemp}`}
                  weatherDesc={weather_data?.weather?.[0]?.description}
                  feelsLike={weather_data?.main?.feels_like + `° ${ModeOfTemp}`}
                  iconCode={weather_data?.weather?.[0]?.icon}
                  main={weather_data?.weather?.[0]?.main}
                />
                <Box2
                  width="w-1/2"
                  humidity={weather_data?.main?.humidity}
                  seaLevel={weather_data?.main?.sea_level}
                  groundLevel={weather_data?.main?.grnd_level}
                  pressure={weather_data?.main?.pressure}
                  windSpeed={weather_data?.wind?.speed}
                />
                <Box3
                  width="w-1/2"
                  sunrise={weather_data?.sys?.sunrise}
                  sunset={weather_data?.sys?.sunset}
                />
              </div>
              <div
                className="innerBox2 flex border-red-400 gap-4"
                style={{ height: "40vh" }}
              >
                {Daily_weather.list &&
                  Daily_weather.list
                    .filter((item) => {
                      const currentDay = new Date().toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                        }
                      );
                      const date = new Date(item.dt * 1000);
                      const day = date.toLocaleDateString("en-US", {
                        weekday: "long",
                      });
                      const hours = date.getHours();
                      return day !== currentDay && hours === 8;
                    })
                    .map((item, index) => {
                      const date = new Date(item.dt * 1000);
                      const day = date.toLocaleDateString("en-US", {
                        weekday: "long",
                      });
                      return (
                        <Days
                          key={index}
                          day={day}
                          desc={item?.weather?.[0].description}
                          tempMax={item?.main?.temp_max + `° ${ModeOfTemp}`}
                          imgCode={item?.weather[0].icon}
                          windSpeed={item?.wind?.speed}
                          icon={item?.weather?.[0]?.icon}
                        />
                      );
                    })}
              </div>
            </div>
            <div className="box2 border-blue-600 rounded-xl height-full">
              <Pannel data={AllCitiesWeather} ModeOfTemp={ModeOfTemp} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
