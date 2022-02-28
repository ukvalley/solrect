import './App.css';
import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";


import Home from "./component/Home";
import Signup from "./component/signup/Signup";
import Login from "./component/login/Login";
import Dashboard from "./component/dashboard/Dashboard";
import Login1 from "./components/auth/login/login"
import Dashboard1 from "./components/customer/dashboard/dashboard"
import Report from "./components/customer/dashboard/report/report"


class App extends Component {

  
  render() {
    return (
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login1/>} />
          <Route path="/dashboard" element={<Dashboard1/>} />
          <Route exact path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;

  

