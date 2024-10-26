import React, { useEffect, useState } from "react";
import { get_cookies_data } from "../Utility/Cookies";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [editFlag, setEditFlag] = useState(false);
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [city, setCity] = useState("");
  const [Alert_Threshold, setAlert_Threshold] = useState(0);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  let cookiesData = get_cookies_data();

  const fetchUserData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookiesData}`,
        },
      };
      const response = await fetch(`${apiUrl}/user/get`, options);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        toast.success(data.message);
        setUserData(data);
        setEmail(data.user_email);
        setName(data.user_name);
        setCity(data.user_city);
        setAlert_Threshold(data.alert_threshold);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data");
    }
  };

  const handelEmailVerification = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookiesData}`,
        },
      };
      const response = await fetch(
        `${apiUrl}/verification/send_verification_email`,
        options
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        toast.success(data.message);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Error sending verification email");
    }
  };

  const handelDeleteAccount = async () => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookiesData}`,
        },
      };
      const response = await fetch(`${apiUrl}/user/delete`, options);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        toast.success(data.message);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Error deleting account");
    }
  };

  const handelStopRecivingWeatherAlerts = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookiesData}`,
        },
      };
      const response = await fetch(`${apiUrl}/user/alerts`, options);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        toast.success(data.message);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error stopping weather alerts:", error);
      toast.error("Error stopping weather alerts");
    }
  };

  const handelUpdateUserData = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookiesData}`,
        },
        body: JSON.stringify({
          user_name: Name,
          user_email: email,
          city: city,
          alert_threshold: Alert_Threshold,
        }),
      };
      const response = await fetch(`${apiUrl}/user/update`, options);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        toast.success(data.message);
        setEditFlag(!editFlag);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Error updating user data");
    }
  };

  useEffect(() => {
    if (!cookiesData) {
      navigate("/login");
    }
    fetchUserData();
  }, [editFlag]);

  return (
    <>
      <div
        className="flex justify-center items-center border-2 border-gray-300"
        style={{ width: "99vw", height: "85vh" }}
      >
        <div
          className="flex flex-col justify-center align-middle mt-5 z-50 cursor-pointer border-1 items-center bg-transperent rounded-xl hover:translate-y-1 ease-in duration-100 box-shadow-transparent"
          style={{ width: "60%", height: "80%" }}
        >
          <h1 className="text-2xl ">Profile</h1>

          <div className="flex gap-1 flex-col  placeholder-black-500 text-center">
            <form
              action=""
              className="flex gap-1 justify-around items-center flex-col"
              style={{ width: "100%" }}
              onSubmit={handelUpdateUserData}
            >
              <div
                className="flex gap-2 justify-around items-center"
                style={{ width: "100%" }}
              >
                <div className="flex flex-col gap-1">
                  {editFlag ? (
                    <div className="flex gap-1 flex-col justify-center items-center">
                      <label htmlFor="name" className="text-xl">
                        Name{" "}
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="bg-transperent input focus:outline-none p-1 rounded-lg placeholder-black-500 text-center"
                      />
                    </div>
                  ) : (
                    <>
                      <img
                        src="../user.png"
                        alt=""
                        className="w-16 h-16"
                        style={{ width: "10vw", height: "18vh" }}
                      />
                      <h1 className="text-2xl">Name : {userData.user_name}</h1>
                    </>
                  )}
                  {editFlag ? (
                    <div className="flex gap-1 flex-col justify-center items-center">
                      <label htmlFor="email" className="text-xl">
                        Email{" "}
                      </label>
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        value={email}
                        id="email"
                        placeholder="Enter your email"
                        className="bg-transperent input focus:outline-none p-1 rounded-lg placeholder-black-500 text-center"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl">
                        Email : {userData.user_email}
                        {userData.email_verified
                          ? " (Verified)"
                          : " (Not Verified)"}
                      </h1>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-5">
                  {editFlag ? (
                    <div className="flex gap-1 flex-col justify-center items-center">
                      <label htmlFor="city" className="text-xl">
                        Cities{" "}
                      </label>
                      <input
                        type="text"
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
                        id="city"
                        value={city}
                        placeholder="Enter your cities"
                        className="bg-transperent input focus:outline-none p-1 rounded-lg placeholder-black-500 text-center"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl">
                        City :{" "}
                        {userData.user_city ? userData.user_city : "Add City"}
                        {/* {userData.city} */}
                      </h1>
                    </>
                  )}
                  {editFlag ? (
                    <div className="flex gap-1 flex-col justify-center items-center">
                      <label htmlFor="Alert_Threshold" className="text-xl">
                        Alert Threshold in Celsius
                      </label>
                      <input
                        type="number"
                        name="Alert_Threshold"
                        onChange={(e) => setAlert_Threshold(e.target.value)}
                        id="Alert_Threshold"
                        value={Alert_Threshold}
                        placeholder="Enter Alert Threshold in Celsius"
                        className="bg-transperent input focus:outline-none p-1 rounded-lg placeholder-black-500 text-center"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl">
                        Alert Threshold :{" "}
                        {userData.alert_threshold
                          ? userData.alert_threshold
                          : "Add Alert Threshold"}{" "}
                        C
                      </h1>
                    </>
                  )}
                </div>
              </div>
              {editFlag ? (
                <>
                  <button
                    type="submit"
                    className="mt-2 bg-transparent box-shadow-transparent p-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all ease-in duration-300"
                  >
                    Save
                  </button>
                </>
              ) : (
                ""
              )}
            </form>
            <div className="buttons flex gap-9 justify-center items-center mt-5">
              <button
                className="bg-transparent box-shadow-transparent p-3 rounded-lg hover:bg-yellow-300 transition-all ease-out duration-300"
                onClick={handelEmailVerification}
              >
                Verify email
              </button>
              <button
                className="bg-transparent box-shadow-transparent p-3 rounded-lg hover:bg-red-300 transition-all ease-out duration-300"
                onClick={handelDeleteAccount}
              >
                Delete account
              </button>
              <button
                className="bg-transparent box-shadow-transparent p-3 rounded-lg hover:bg-slate-300 transition-all ease-out duration-300"
                onClick={handelStopRecivingWeatherAlerts}
              >
                {userData.alerts ? "Stop Reciving Alerts" : "Recive Alerts"}
              </button>
              {editFlag ? (
                ""
              ) : (
                <button
                  className="bg-transparent box-shadow-transparent p-3 rounded-lg hover:bg-green-300 transition-all ease-out duration-300"
                  onClick={() => {
                    setEditFlag(!editFlag);
                  }}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
