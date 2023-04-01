import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = 'https://localhost:7275/api/UserManagement';
    private tokenKey = 'auth_token';
    private userSubject = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient, private router: Router) { }

    // token obtained from the API response and then stored in the local storage

    loginUser(email: string, password: string) {
        const url = `${this.authUrl}/login`;
        return this.http.post<{ token: string, user: any }>(
            url,
            { email, password },
        ).pipe(
            tap(({ token, user }) => {
                localStorage.setItem(this.tokenKey, token);
                this.userSubject.next(user);
            })
        );
    }
    
    // signUp(loginObj: any) {
    //     return this.http.post<any>(`${this.authUrl}/register`, userObj)
    // }

    // signIn(loginObj: any) {
    //     return this.http.post<any>(`${this.authUrl}/login`, loginObj)
    // }

    signOut(){
        localStorage.clear();
        // alternative
        // localStorage.removeItem('token');
        this.router.navigate(['/login'])
    }
    

    storeToken(tokenValue: string) {
        localStorage.setItem('token', tokenValue)
    }

    getToken(){
        return localStorage.getItem('token')
    }

    // isLoggedIn(): boolean{
    //     return !!localStorage.getItem('token')
    // }
}
