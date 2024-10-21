const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const GetDateTime = () => {
  const now = new Date();

  // Get the day of the week
  const day = days[now.getDay()];

  // Get the hours and minutes
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0, make it 12

  // Add a leading zero to minutes if needed
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  // Format the time
  const time = `${hours}:${minutes} ${ampm}`;

  return `${day} ${time}`;
};

export const UnixToTimestamp = ({ unixTimestamp }) => {
  const date = new Date(parseInt(unixTimestamp) * 1000); // Convert to milliseconds

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // 0 should be 12

  // Add leading zeros to minutes and seconds if needed
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

  return formattedTime;
};
