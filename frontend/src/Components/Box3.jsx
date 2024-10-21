import React from "react";
import { UnixToTimestamp } from "../Utility/DateTime";

const Box3 = ({ width, sunrise, sunset }) => {
  return (
    <div
      className={`${width} border-white4100 border-1 rounded-lg p-4 flex flex-col gap-2 justify-between box-shadow-depth`}
    >
      <div className="flex justify-between items-center">
        <div className="text-4xl font-medium flex flex-col gap-1 justify-center items-center">
          Sunrise{" "}
          <span className="font-medium text-lg">
            <UnixToTimestamp unixTimestamp={sunrise} />
          </span>
        </div>

        <div>
          <img src="sunrise.svg" alt="" className="w-10 h-10" />
        </div>
      </div>

      {/* sunseet */}
      <div className="flex justify-between items-center">
        <div className="text-4xl font-medium flex flex-col gap-1 justify-center items-center">
          Sunset{" "}
          <span className="font-medium text-lg">
            {" "}
            <UnixToTimestamp unixTimestamp={sunset} />
          </span>
        </div>

        <div>
          <img src="sunset.png" alt="" className="w-10 h-10" />
        </div>
      </div>

      {/* div under numbers */}
    </div>
  );
};

export default Box3;
