import React, {FC, useContext, useEffect} from 'react';
// @ts-ignore
import {BrowserRouter, Navigate} from "react-router-dom";

import {Context} from "./index";
import {observer} from "mobx-react-lite";

import "./reset.css";
import "./index.css";

import RoutesAll from "./routes/RoutesAll";
import {ToastContainer} from "react-toastify";



const App: FC = () => {
    const {store} = useContext(Context);


    useEffect(() => {
        //if (localStorage.getItem('token')) {
            store.checkAuth()
        //}
    }, [store.isPatchLogin, store.isPatchHome])




    if (store.isLoading) {
        return <div>Загрузка...</div>
    }



    return (

        <BrowserRouter>

            <ToastContainer />
            <RoutesAll />

        </BrowserRouter>

    );
};

export default observer(App);