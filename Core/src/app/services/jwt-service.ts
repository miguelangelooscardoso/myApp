import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    constructor(private jwtHelperService: JwtHelperService) { }

    // methods for working with JWT tokens

    public decodeToken(token: string): any {
        return this.jwtHelperService.decodeToken(token);
    }      
    
    public isTokenExpired(token: string): boolean {
        return this.jwtHelperService.isTokenExpired(token);
    }

    public getToken(): string | null {
        return localStorage.getItem('token');
    }

    // add any other methods related to JWT tokens here
}
