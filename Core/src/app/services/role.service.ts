import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth-service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleSubject = new BehaviorSubject<string>('');
  role$ = this.roleSubject.asObservable();

  constructor(private authService: AuthService) { }

  setRole(role: string) {
    this.roleSubject.next(role);
  }

  checkRole(role: string): boolean | null {
    // Get the current user from the AuthenticationService
    const currentUser: User | null = this.authService.currentUser;
    // Check if the current user exists and has the specified role
    return currentUser && currentUser.roles && currentUser.roles.includes(role) || null;
  }
}
