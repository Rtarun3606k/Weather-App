import React from "react";

const Box = ({
  width,
  current,
  minTemp,
  maxTemp,
  weatherDesc,
  feelsLike,
  iconCode,
  main,
}) => {
  return (
    <div
      className={`${width} border-white4100 border-1 rounded-lg p-4 flex flex-col gap-2 justify-between box-shadow-depth`}
    >
      <div className="flex justify-between items-center">
        <div className="text-3xl font-medium">{current}</div>
        <div>
          <p>
            High <span className="font-medium text-lg">{maxTemp}</span>
          </p>
          <p>
            Low <span className="font-medium text-lg">{minTemp}</span>
          </p>
        </div>
      </div>

      {/* div under numbers */}

      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="capitalize">{weatherDesc}</p>
          <p>Feels like {feelsLike}</p>
          <p className="flex justify-start items-center gap-2 ">
            <span>
              {/* <img src="location.png" alt="" className="w-4 h-4" /> */}

              {iconCode === "09n" ||
              iconCode === "09d" ||
              iconCode === "10n" ||
              iconCode === "10d" ||
              iconCode === "11n" ||
              iconCode === "11d" ? (
                <>
                  <img src="umbrella.png" alt="" className="w-8 h-8" />
                </>
              ) : null}
            </span>
            {main}
          </p>
        </div>
        <img src={`/icons/${iconCode}.png`} alt="" className="w-14 h-14" />
      </div>
    </div>
  );
};

export default Box;
