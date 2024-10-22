import React, { useEffect, useState } from "react";
import "../Components/Components.css";

const Login = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, [showpassword]);

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
          style={{ width: "30%", height: "50%" }}
        >
          <h1 className="text-2xl mb-3">Login</h1>
          <form className="flex flex-col gap-3 justify-center items-center">
            <div className="flex gap-1 flex-col justify-center items-center placeholder-black-500 text-center">
              <label htmlFor="email">Email </label>
              <input
                type="email"
                name="email"
                id="email"
                value={Name}
                onChange={(e) => setName(e.target.value)}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
                className="bg-transperent input focus:outline-none p-1 rounded-lg placeholder-black-500 text-center"
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
              Login
            </button>
          </form>

          <p className="mt-2">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-300 hover:underline transition-all ease-in duration-300"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
