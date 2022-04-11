import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Application from "./views/Application";
import Launcher from "./views/Launcher";

function App() {
  // returns Application and Launcher React Components as web pages;
  return (
      <BrowserRouter>
        <Routes>
          <Route eact path="/app" element={<Application />} />
          <Route eact path="/" element={<Launcher />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
