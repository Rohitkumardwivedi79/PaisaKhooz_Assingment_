import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import ForgotPassword from "./components/Forgotpassword";


function App() {
   
    return (
        <Router>
            <Header/>
            
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup/>} /> 
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
