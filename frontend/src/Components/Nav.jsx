import React from "react";
import "./Components.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex justify-center align-middle mt-5 z-50 cursor-pointer relative">
      <nav className="nav flex justify-center align-middle max-w-fit rounded-xl hover:translate-y-1 ease-in duration-100 px-8">
        <ul className="flex gap-16 m-4">
          <NavLink to={"/"}>
            <li className="hover:text-white transition-all ease-in duration-300">
              Home
            </li>
          </NavLink>
          <NavLink to={"profile"}>
            <li className="hover:text-white transition-all ease-in duration-300">
              Profile
            </li>
          </NavLink>
          <NavLink to={"contact"}>
            <li className="hover:text-white transition-all ease-in duration-300">
              Contact
            </li>
          </NavLink>
          <NavLink to={"login"}>
            <li className="hover:text-white transition-all ease-in duration-300">
              Login
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
