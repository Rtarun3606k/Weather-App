import React, { useState } from "react";
import "../Components/Components.css";

const Register = () => {
  const [showpassword, setShowpassword] = useState(false);
  return (
    <>
      <div className="" id="myVideo">
        <img src="sunny.jpg" alt="" />
      </div>
      <div
        className="flex flex-col justify-center align-middle mt-5 z-50 cursor-pointer border-1 items-center rounded-xl hover:translate-y-1 ease-in duration-100 "
        style={{ width: "98vw", height: "88vh" }}
      >
        <div
          className=" flex flex-col justify-center align-middle mt-5 z-50 cursor-pointer border-1 items-center bg-transperent rounded-xl hover:translate-y-1 ease-in duration-100 box-shadow-transparent"
          style={{ width: "30%", height: "80%" }}
        >
          <h1 className="text-2xl mb-3">Register</h1>
          <form className="flex flex-col gap-3 justify-center items-center">
            <div className="flex gap-1 flex-col justify-center items-center">
              <label htmlFor="name">Name </label>
              <input
                type="text"
                name="userName"
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
                id="email"
                placeholder="Enter your email"
                className="bg-transperent input focus:outline-none p-1 rounded-lg  placeholder-black-500 text-center"
              />
            </div>
            <div className="flex gap-1 flex-col justify-center items-center ">
              <label htmlFor="password">Password </label>
              <input
                type={showpassword ? "text" : "password"}
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
