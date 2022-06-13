import React, {useContext, useState} from 'react';
import {Context} from "../index";
import { Navigate} from "react-router-dom";
import UsersService from "../services/UsersService";
import UserService from "../services/UserService";
import {IUser} from "../models/IUser";
import {IUserinfo} from "../models/IUserinfo";
import Header from "../components/header/Header";


function HomeScreen() {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    const [userinfo, setUserinfo] = useState<IUserinfo[]>([]);


    async function getUsers() {
        try {
            const response = await UsersService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function getUser() {
        try {
            const response = await UserService.fetchUser(store.user.email);
            setUserinfo(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isPatchLogin) return <Navigate to={"/login"} />

    // @ts-ignore
    return (
        <div>
            <Header/>

            <h1>{store.isAuth ? `Пользователь ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <div>
                <button onClick={getUsers}>Получить пользователей</button>
            </div>
            <div>
                <button onClick={getUser}>Получить пользователя</button>
            </div>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )}
            {
                // eslint-disable-next-line
                userinfo.length != 0 &&
                <div>{userinfo[0].email}</div>
            }
        </div>
    );
}

export default HomeScreen;