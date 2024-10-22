import React, { Profiler } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

const APPRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Home />} index />
            <Route element={<Register />} path="register" />
            <Route element={<Login />} path="login" />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default APPRouter;
