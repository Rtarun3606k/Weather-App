import React from "react";

const Pannel = ({ width, data, ModeOfTemp }) => {
  const boxContent = (
    name,
    country,
    temp,
    feels_like,
    iconCode,
    desc,
    flag
  ) => {
    console.log(name, country, temp, feels_like, iconCode);
    return (
      <div
        className={`flex justify-between items-center ${
          flag ? "" : "border-b-2"
        } p-2 width-full border-black`}
      >
        <div className="flex flex-col gap-0">
          <div className="font-medium text-lg">{name}</div>
          <div className="font-light text-sm">{country}</div>
        </div>
        <div className="flex gap-1 items-center">
          <img src={`/icons/${iconCode}.png`} alt="" className="w-10 h-10" />
        </div>
        <div className="flex gap-0 items-center flex-col">
          <p>{desc}</p>
          <p>{feels_like}</p>
        </div>
      </div>
    );
  };

  console.log(data);
  return (
    <div
      className={`${width} border-white border-1 rounded-lg p-4 flex flex-col gap-2 justify-between box-shadow-depth items-center`}
    >
      <p className="text-xl">
        Forecast in Other <samp className="font-bold">Cities</samp>{" "}
      </p>
      {Array.isArray(data) &&
        data.map((item, index) =>
          boxContent(
            item?.city,
            item?.data.sys?.country,
            item?.data.main?.temp,
            item?.data.main?.feels_like + `°${ModeOfTemp}`,
            item?.data.weather?.[0]?.icon,
            item?.data.weather?.[0]?.description,
            index === 5
          )
        )}
    </div>
  );
};

export default Pannel;
