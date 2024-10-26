import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";
import { get_longitude_latitude } from "../Utility/geoLocation";

const Layout = () => {
  const [img, setimg] = useState("01d");

  const fetchWeatherData = async () => {
    const { latitude, longitude } = await get_longitude_latitude();
    console.log(latitude, longitude);

    const urlWithGeoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`;

    try {
      const response = await fetch(urlWithGeoLocation);
      const data = await response.json();
      setimg(data.weather[0].icon);
      console.log(data.weather[0].icon);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    fetchWeatherData();
  });

  return (
    <div className="">
      <div id="myVideo">
        <img src={`../backgrounds/${img}.jpg`} type="video/mp4" />
      </div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Layout;
