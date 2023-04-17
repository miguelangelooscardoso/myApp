import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private roleService: RoleService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.roleService.role$.pipe(
      take(1),
      map((currentUserRole: string) => {
        if (this.authService.currentUser) {
          if (currentUserRole === 'User') {
            return true;
          } else {
            this.router.navigate(['/pagenotfound']);
            return false;
          }
        } else {
          // login is a form i.e. doesn't open over the page
          // this.router.navigate(['/login']);
          this.router.navigate(['/pagenotfound']);

          return false;
        }
      })
    );
  }
}
