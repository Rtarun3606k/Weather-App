import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
const Box2 = ({
  width,
  pressure,
  humidity,
  groundLevel,
  seaLevel,
  windSpeed,
}) => {
  const boxContent = (name, value, icon, flagBorder) => {
    return (
      <>
        <div
          className={`flex justify-between items-center ${
            flagBorder ? "" : `border-b-2`
          } width-full  border-black`}
        >
          <div>
            <p className="font-medium">{name}</p>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <p>{value}</p>
            <i src="search.png" alt="" className={`w-6 h-6 ${icon} fa`} />
          </div>
        </div>
      </>
    );
  };
  return (
    <div
      className={`${width} border-white4100 border-1 rounded-lg p-4 flex flex-col gap-2 justify-between box-shadow-depth`}
    >
      {boxContent("Pressure", `${pressure} hPa`, "fa-tachometer-alt")}
      {boxContent("Humidity", `${humidity} %`, "fa-tint")}
      {boxContent("Ground Level", `${groundLevel} m`, "fa-mountain")}
      {boxContent("Sea Level", `${seaLevel} m`, "fa-water")}
      {boxContent("Wind Speed", `${windSpeed} m/s`, "fa-wind", true)}
    </div>
  );
};

export default Box2;
