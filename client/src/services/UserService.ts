import $api from "../http";
import {AxiosResponse} from 'axios';
import {IUser} from "../models/IUser";
import {AuthResponse} from "../models/response/AuthResponse";

export default class UserService {
    static fetchUser(emailuser: string): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/user/'+emailuser)
    }
}

