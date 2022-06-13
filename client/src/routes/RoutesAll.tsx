import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

function RoutesAll() {

    return (
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/registration" element={<RegistrationScreen />} />
        </Routes>
    );
}

export default RoutesAll;