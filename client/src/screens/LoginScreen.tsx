import React, {useContext} from 'react';
import LoginForm from "../components/loginform/LoginForm";
import {Context} from "../index";
import {Navigate} from "react-router-dom";


function LoginScreen() {
    const {store} = useContext(Context);



    if (store.isPatchHome) return <Navigate to={"/"} />


    return (

        <main className="main">
            <LoginForm/>
        </main>

    );
}

export default LoginScreen;
