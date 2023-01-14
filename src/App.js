import React from "react";
import Home from "./Home";
import Admin from "./Admin";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";


function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home/>} />
          <Route element={<RequireAuth />}>
            <Route exact path="/Admin" element={<Admin/>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
