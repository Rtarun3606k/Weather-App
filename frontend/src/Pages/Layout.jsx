import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";

const Layout = () => {
  return (
    <div className="">
      <Nav />
      <Outlet />
    </div>
  );
};

export default Layout;
