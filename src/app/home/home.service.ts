import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HomeService {
    private baseUrl = 'http://localhost:3000';

    constructor(private httpClient: HttpClient) {
    }

    addContact(userId: number, name: string, number: string) {
        let body = {
            name: name,
            number: number
        };
        return this.httpClient.post(this.baseUrl + `/api/users/${userId}/contacts`, body);
    }

    getContact(userId: number) {
        return this.httpClient.get(this.baseUrl + `/api/users/${userId}/contacts`);
    }

    removeContact(userId: number, contactId: number) {
        return this.httpClient.delete(this.baseUrl + `/api/users/${userId}/contacts/${contactId}`);
    }

    updateContact(userId: number, contactId: number, name: string, number: string) {
        let body = {
            name: name,
            number: number
        };
        return this.httpClient.put(this.baseUrl + `/api/users/${userId}/contacts/${contactId}`, body);
    }
}