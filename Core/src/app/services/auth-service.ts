import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = 'https://localhost:7275/api/UserManagement';
    private tokenKey = 'auth_token';
    private userSubject = new BehaviorSubject<any>(null);
    public user: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.userSubject = new BehaviorSubject<User | null>(null);
        this.user = this.userSubject.asObservable();
    }

    // token obtained from the API response and then stored in the local storage

    loginUser(email: string, password: string) {
        const url = `${this.authUrl}/login`;
        return this.http.post<{ token: string, user: any }>(
            url,
            { email, password },
        ).pipe(
            tap(({ token, user }) => {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const userId = payload.sub;
                console.log('Payload:', payload); // Added console log to log the payload
                this.userSubject.next({ id: userId, ...user });
            })
        );
    }

    checkRole(email: string, password: string): Observable<User> {
        const url = `${this.authUrl}/login`;
        return this.http.post<{ id: number, fullName: string, email: string, role: string, token: string }>(
            url,
            { email, password },
        ).pipe(
            map(({ id, fullName, email, role }: { id: number, fullName: string, email: string, role: string }) => {
                const user: User = {
                    id,
                    fullName,
                    email,
                    password: '', // Set to empty string as it's missing in the response
                    roles: [role] // Assign role as an array to the roles property of User object
                };
                return user;
            }),
            tap(({ id, fullName, email, roles }) => {
                console.log('ID:', id);
                console.log('Full Name:', fullName);
                console.log('Email:', email);
                console.log('Roles:', roles);
            })
        );
    }
    
    
    
    
    
    
    

    get currentUser(): User | null {
        return this.userSubject.value;
    }


    // signUp(loginObj: any) {
    //     return this.http.post<any>(`${this.authUrl}/register`, userObj)
    // }

    // signIn(loginObj: any) {
    //     return this.http.post<any>(`${this.authUrl}/login`, loginObj)
    // }

    // signOut(){
    //     localStorage.clear();
    //     alternative
    //     localStorage.removeItem('token');
    //     this.router.navigate(['/login'])
    // }


    storeToken(tokenValue: string) {
        localStorage.setItem('token', tokenValue)
    }

    getToken() {
        return localStorage.getItem('token')
    }

    // isLoggedIn(): boolean{
    //     return !!localStorage.getItem('token')
    // }

}