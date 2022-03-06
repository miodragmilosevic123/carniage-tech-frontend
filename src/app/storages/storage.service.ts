import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    setUserId(userId: string) {
        localStorage.setItem('userId', userId);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUserId() {
        if (!localStorage.getItem('userId')) {
            return '';
        }
        return localStorage.getItem('userId');
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    removeUserId() {
        localStorage.removeItem('userId');
    }
}