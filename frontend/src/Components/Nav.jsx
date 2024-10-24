import React, { useState, useEffect } from "react";
import "./Components.css";
import { NavLink } from "react-router-dom";
import { delete_cookies_storedata, get_cookies_data } from "../Utility/Cookies";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const cookieData = get_cookies_data(); // Get the cookie data
    setFlag(cookieData.length > 12); // Check length and update flag
  }, []);

  const handleLogout = () => {
    delete_cookies_storedata();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex justify-center align-middle mt-5 z-50 cursor-pointer relative">
      <nav className="nav flex justify-center align-middle max-w-fit rounded-xl hover:translate-y-1 ease-in duration-100 px-8">
        <ul className="flex gap-16 m-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "hover:text-black text-white transition-all ease-in duration-300"
                : "hover:text-white transition-all ease-in duration-300"
            }
          >
            <li
              className={({ isActive }) =>
                isActive
                  ? "hover:text-black text-white transition-all ease-in duration-300"
                  : "hover:text-white transition-all ease-in duration-300"
              }
            >
              Home
            </li>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "hover:text-black text-white transition-all ease-in duration-300"
                : "hover:text-white transition-all ease-in duration-300"
            }
          >
            <li className="hover:text-white transition-all ease-in duration-300">
              Profile
            </li>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "hover:text-black text-white transition-all ease-in duration-300"
                : "hover:text-white transition-all ease-in duration-300"
            }
          >
            <li className="hover:text-white transition-all ease-in duration-300">
              Contact
            </li>
          </NavLink>
          {flag ? (
            <li
              className="hover:text-white transition-all ease-in duration-300"
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "hover:text-black text-white transition-all ease-in duration-300"
                  : "hover:text-white transition-all ease-in duration-300"
              }
            >
              <li className="hover:text-white transition-all ease-in duration-300">
                Login
              </li>
            </NavLink>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
