import React from "react";
import "./Components.css";

const Nav = () => {
  return (
    <div className="flex justify-center align-middle mt-5 z-50 cursor-pointer relative">
      <nav className="nav flex justify-center align-middle max-w-fit rounded-xl hover:translate-y-1 ease-in duration-100 px-8">
        <ul className="flex gap-16 m-4">
          <li className="hover:text-white transition-all ease-in duration-300">
            Home
          </li>
          <li className="hover:text-white transition-all ease-in duration-300">
            Wind Map
          </li>
          <li className="hover:text-white transition-all ease-in duration-300">
            Contact
          </li>
          <li className="hover:text-white transition-all ease-in duration-300">
            About Us
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
