import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const Days = ({ day, imgCode, tempMax, desc, windSpeed, icon }) => {
  return (
    <div className="flex flex-col gap-3 justify-evenly items-center  width-full   box-shadow-depth rounded-lg">
      <div className="flex flex-col gap-1 items-center capitalize">
        <p className="font-medium text-lg">{day}</p>
        <p className="font-light">{desc}</p>
      </div>
      <img src={`/icons/${imgCode}.png`} alt="" className="w-10 h-10" />
      <p className="font-medium">{tempMax}</p>
      {/* <p className="font-medium">{windSpeed}m/s</p> */}
      <div className="flex gap-1 items-center justify-center">
        <p>{windSpeed}m/s</p>
        <i src="search.png" alt="" className={`w-6 h-6 fa-wind fa`} />
      </div>
      {/* <p className="font-medium">{sunset}</p> */}
    </div>
  );
};

export default Days;
