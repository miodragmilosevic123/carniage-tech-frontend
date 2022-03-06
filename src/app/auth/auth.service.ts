import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    private baseUrl = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) {
    }

    login(username: string, password: string) {
        let body = {
            username: username,
            password_digest: password
        };
        return this.httpClient.post(this.baseUrl + '/api/users/login', body);
    }

    register(username: string, password: string, email: string,
             firstName?: string, lastName?: string) {
        let body = {
            username: username,
            password_digest: password,
            email: email,
            first_name: firstName,
            last_name: lastName
        };
        return this.httpClient.post(this.baseUrl + '/api/users', body);
    }
}