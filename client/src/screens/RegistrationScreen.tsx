import React, {useContext} from 'react';
import {Context} from "../index";
import {Navigate} from "react-router-dom";
import RegistrationForm from "../components/registrationform/RegistrationForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationScreen() {
    const {store} = useContext(Context);

    if (store.isPatchHome) return <Navigate to={"/"} />


    return (

        <main className="main">
            <RegistrationForm/>
        </main>

    );
}

export default RegistrationScreen;
