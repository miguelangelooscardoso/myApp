// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { catchError } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { JwtService } from 'src/app/services/jwt-service';
// import { UtilityService } from 'src/app/services/utility.service';
// import { AuthService } from 'src/app/services/auth-service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit{
//   loginForm!: FormGroup;
//   message = "";

//   constructor(
//     private fb: FormBuilder, 
//     private authService: AuthService,
//     private utilityService: UtilityService,
//     private jwtService: JwtService
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       pwd: [
//         '',
//         [
//           Validators.required,
//           Validators.minLength(6),
//           Validators.maxLength(15),
//         ],
//       ],
//     });
//   }

//   login() {
//     this.authService
//       .loginUser(this.Email.value, this.PWD.value)
//       .pipe(
//         catchError((error) => {
//           console.error(error);
//           return of('Error occurred');
//         })
//       )
//       .subscribe((res: any) => {
//         if (res.toString() !== 'invalid') {
//           this.message = 'Logged In Successfully.';
//           this.utilityService.setUser(res.toString());
//           const refreshToken = localStorage.getItem('refreshToken') || '';
//           console.log('refreshToken:', refreshToken); // ''
//           const decodedToken = this.jwtService.decodeToken(refreshToken);
//           console.log('decodedToken:', decodedToken); // null

//           // Check token validity
//           const isValid = this.jwtService.isTokenExpired(refreshToken);
//           console.log('Token is valid:', !isValid); // false


//         } else {
//           this.message = 'Invalid Credentials!';
//         }
//       });
//   }

//   get Email(): FormControl {
//     return this.loginForm.get('email') as FormControl;
//   }

//   get PWD(): FormControl {
//     return this.loginForm.get('pwd') as FormControl;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { JwtService } from 'src/app/services/jwt-service';
import { UtilityService } from 'src/app/services/utility.service';
import { AuthService } from 'src/app/services/auth-service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = "";
  jwtToken: string = '';
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utilityService: UtilityService,
    private jwtService: JwtService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  login() {
    this.authService
      .loginUser(this.Email.value, this.PWD.value)
      .pipe(
        catchError((error) => {
          console.error(error);
          if (error.status === 400) {
            return of({ error: 'Invalid Credentials!' });
          } else {
            return of({ error: 'Error occurred' });
          }
        })
      )
      .subscribe((res: any) => {
        if (res.error) {
          this.message = res.error;
        } else {
          this.message = 'Logged In Successfully.';
          this.jwtToken = res.token;
          this.authService.storeToken(this.jwtToken);
          const decodedToken = this.jwtService.decodeToken(this.jwtToken); // payload
          console.log('Decoded JWT:', decodedToken);
          localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
          // this.isLoggedIn = true;

          // Check token validity
          const isValid = this.jwtService.isTokenExpired(this.jwtToken);
          console.log('Token is valid:', !isValid); // true

          // I am having an error when I add these two lines of code
          // "The inspected token doesn't appear to be a JWT."
          this.utilityService.setUser(this.jwtToken);
          console.log(this.utilityService.getUser());

          // Call checkRole() from AuthService and log role information
          this.authService.checkRole(this.Email.value, this.PWD.value)
            .subscribe((user: User) => {
              console.log('Role:', user.roles[0]); // Log the role of the user
            });
        }
      });
  }

  // logout(){
  //   this.authService.signOut();
  // }


  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}





