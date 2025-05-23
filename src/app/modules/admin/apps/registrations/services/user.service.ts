import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userMockData } from '../mock/user';
import { IUser } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private _http: HttpClient) {}

    getUsers(): Promise<IUser[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(userMockData);
            }, 500);
        });
    }

    getUsersById(login: string): Promise<IUser | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userData = userMockData.find((inst) => inst.login === login);
                resolve(userData);
            }, 500);
        });
    }
}
