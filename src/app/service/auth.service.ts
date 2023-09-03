import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    jwtHelperService: JwtHelperService;

    constructor() {
        this.jwtHelperService = new JwtHelperService();
    }
    public get userDetails() {
        const token = localStorage.getItem('jwtToken');
        if (this.jwtHelperService.isTokenExpired(token)) {
            return {};
        }
        const userDetails = this.jwtHelperService.decodeToken(token);
        return userDetails;
    }

}

