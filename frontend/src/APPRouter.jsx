import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";

const APPRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Home />} index />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default APPRouter;
