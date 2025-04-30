import React from "react";
import "./style.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
