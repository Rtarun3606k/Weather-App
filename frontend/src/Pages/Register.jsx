import React, { useState } from "react";
import "../Components/Components.css";
import { toast } from "react-toastify";
import ToastCoustome from "../Components/ToastCoustome";

const Register = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [email, setEmail] = useState("");

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(apiUrl);
    console.log(userName, email, password, retypePassword);
    if (password !== retypePassword) {
      alert("Password do not match");
      return;
    }
    const response = await fetch(`${apiUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: userName,
        user_email: email,
        user_password: password,
        user_password_retype: retypePassword,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      toast.success(data.message);
      //   ToastCoustome({ message: data.message, sucess: true });
    } else {
      console.log(data.message);
      toast.error(data.message);
      //   ToastCoustome({ message: data.message, sucess: false });
    }
  };

  return (
    <>
      <div
        className="flex flex-col justify-center align-middle mt-5 z-50 cursor-pointer border-1 items-center rounded-xl hover:translate-y-1 ease-in duration-100 "
        style={{ width: "98vw", height: "88vh" }}
      >
        <div
          className=" flex flex-col justify-center align-middle mt-5 z-50 cursor-pointer border-1 items-center bg-transperent rounded-xl hover:translate-y-1 ease-in duration-100 box-shadow-transparent"
          style={{ width: "30%", height: "80%" }}
        >
          <h1 className="text-2xl mb-3">Register</h1>
          <form
            className="flex flex-col gap-3 justify-center items-center"
            onSubmit={registerUser}
          >
            <div className="flex gap-1 flex-col justify-center items-center">
              <label htmlFor="name">Name </label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                id="name"
                placeholder="Enter your name"
                className="bg-transperent input focus:outline-none p-1 rounded-lg  placeholder-black-500 text-center"
              />
            </div>
            <div className="flex gap-1 flex-col justify-center items-center placeholder-black-500 text-center">
              <label htmlFor="email">Email </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Enter your email"
                className="bg-transperent input focus:outline-none p-1 rounded-lg  placeholder-black-500 text-center"
              />
            </div>
            <div className="flex gap-1 flex-col justify-center items-center ">
              <label htmlFor="password">Password </label>
              <input
                type={showpassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="bg-transperent input focus:outline-none p-1 rounded-lg placeholder-black-500 text-center"
              />
            </div>
            <div className="flex gap-1 flex-col justify-center items-center placeholder-black-500 text-center">
              <label htmlFor="Retype">Retype Password </label>
              <input
                type={showpassword ? "text" : "password"}
                name="Retype"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                id="Retype"
                placeholder="Retype your password"
                className="bg-transperent input focus:outline-none p-1 rounded-lg   font-medium placeholder-black-500 text-center"
              />
            </div>
            <div className="flex gap-2">
              <label htmlFor="chaeckbox">
                {showpassword ? "Hide password" : "Show password"}
              </label>
              <input
                type="checkbox"
                name=""
                id="chaeckbox"
                value={showpassword}
                onChange={(e) => setShowpassword(!showpassword)}
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-transparent box-shadow-transparent p-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all ease-in duration-300"
            >
              Register
            </button>
          </form>
          <p className="mt-2">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-300 hover:underline transition-all ease-in duration-300"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
