import React, { useEffect, useState } from "react";

const History = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url = `${apiUrl}/user/history`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Fetched data:", data); // Log the fetched data
      setData(data.daily_summary);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const day = date.toLocaleDateString();
    const time = date.toLocaleTimeString([], options);
    return `${day} ${time}`;
  };

  const celsuics = (temp) => {
    return (temp - 273.15).toFixed(2);
  };

  const Block = ({ name, date, max_temp, min_temp, condition }) => {
    return (
      <tbody>
        <tr className="bg-transparent border-b">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-black whitespace-nowrap"
          >
            {name}
          </th>
          <td className="px-6 py-4">{formatDate(date)}</td>
          <td className="px-6 py-4">{celsuics(max_temp)}°C</td>
          <td className="px-6 py-4">{celsuics(min_temp)}°C</td>
          <td className="px-6 py-4">{condition}</td>
        </tr>
      </tbody>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="border-red-500 max-w-full flex justify-center align-middle mb-3">
      <div
        className="flex flex-col align-middle mt-5 z-50 cursor-pointer border-1 items-center bg-transperent rounded-xl hover:translate-y-1 ease-in duration-100 px-8 box-shadow-transparent"
        style={{ width: "95%", height: "85vh" }}
      >
        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-left rtl:text-right text-black bg-transparent">
            <thead className="text-xs text-black uppercase bg-transparent">
              <tr>
                <th scope="col" className="px-6 py-3">
                  City
                </th>
                <th scope="col" className="px-6 py-3">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Max Temperature
                </th>
                <th scope="col" className="px-6 py-3">
                  Min Temperature
                </th>
                <th scope="col" className="px-6 py-3">
                  Dominant Condition
                </th>
              </tr>
            </thead>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item) => (
                <Block
                  key={item.date} // Ensure this key is unique
                  name={item.city_name}
                  date={item.date}
                  max_temp={item.max_temperature}
                  min_temp={item.min_temperature}
                  condition={item.dominant_condition}
                />
              ))
            ) : (
              <tbody>
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    No data available
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
