const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const DailySummary = async (Data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city_name: Data?.name || "Unknown",
      date: Math.floor(Date.now() / 1000), // Unix timestamp
      avg_temperature: Data?.main?.feels_like || 0,
      max_temperature: Data?.main?.temp_max || 0,
      min_temperature: Data?.main?.temp_min || 0,
      dominant_condition: Data?.weather?.[0]?.description || "Unknown",
    }),
  };
  const response = await fetch(`${apiUrl}/user/daily_summary`, options);
  const data = await response.json();
  if (response.ok) {
    console.log(data.message);
    // return data;
  } else {
    throw new Error(data.message);
  }
};

export const RealTimeSummary = async (Data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city_name: Data?.name || "Unknown",
      date: Math.floor(Date.now() / 1000), // Unix timestamp
      temperature: Data?.main?.temp_max || 0,
      feels_like: Data?.main?.temp_max || 0,
      main_condition: Data?.weather?.[0]?.description || "Unknown",
    }),
  };
  const response = await fetch(`${apiUrl}/user/realtime_weather`, options);
  const data = await response.json();
  if (response.ok) {
    console.log(data.message);
    // return data;
  } else {
    throw new Error(data.message);
  }
};
