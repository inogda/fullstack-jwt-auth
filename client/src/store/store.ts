import { ToastContainer, toast } from 'react-toastify';
import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";


export default class Store {
    user = {} as IUser;
    isAuth = false;
    isPatchLogin = false; // переход на страницу авторизации
    isPatchHome = false; // переход на главную страницу после авторизации
    isLoading = false;


    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }
    setPatchLogin(bool: boolean) {
        this.isPatchLogin = bool;
    }

    setPatchHome(bool: boolean) {
        this.isPatchHome = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
            // eslint-disable-next-line
            if (window.location.pathname == "/login") {
                this.setPatchHome(true);
                this.setPatchLogin(false);
            }
        } catch (e) {
            this.setPatchHome(false);
            toast.error(e.response?.data?.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log(e.response?.data?.message);
        }
    }

    async registration(email: string, password: string, firstname: string, lastname: string) {
        try {


            const response = await AuthService.registration(email, password, firstname, lastname);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            // eslint-disable-next-line
            if (window.location.pathname == "/registration") {
                this.setPatchHome(true);
                this.setPatchLogin(false);
            }
        } catch (e) {
            this.setPatchHome(false);
            toast.error(e.response?.data?.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            //const response =
                await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
            // eslint-disable-next-line
            if (window.location.pathname != "/login"){
                this.setPatchLogin(true);
                this.setPatchHome(false);
            }
        } catch (e) {
            console.log(e.response?.data?.message);
            toast.error(e.response?.data?.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    async checkAuth() {

        this.setLoading(true);
        try {

            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true);
            this.setPatchLogin(false);
            this.setUser(response.data.user);

        } catch (e) {
            console.log(e.response?.data?.message);
            toast.error(e.response?.data?.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            // eslint-disable-next-line
            if (window.location.pathname != "/login"){
                this.setPatchLogin(true);
                this.setPatchHome(false);
            }

        } finally {
            this.setLoading(false);
        }
    }
}
