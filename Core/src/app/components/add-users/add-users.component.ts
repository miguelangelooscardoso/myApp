import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  addUserForm!: FormGroup;
  roles: string[] = ['Admin', 'Employee', 'User'];
  invalidConfirmPassword = false;
  message: string = '';

  constructor(private formBuilder: FormBuilder, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z]/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required],
      roles: ['', Validators.required]
    }, {
      validator: this.matchingPasswords('password', 'confirmPassword')
    });
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        this.invalidConfirmPassword = true;
        return confirmPassword.setErrors({ mismatchedPasswords: true });
      } else {
        this.invalidConfirmPassword = false;
        return confirmPassword.setErrors(null);
      }
    };
  }

  addUser(): void {
    if (this.addUserForm.valid && !this.invalidConfirmPassword) {
      const user: User = {
        id: 0,
        fullName: this.addUserForm.value.fullName,
        email: this.addUserForm.value.email,
        password: this.addUserForm.value.password,
        roles: this.addUserForm.value.roles // change to string
      };

      console.log("User before sending to API: ", user);

      this.navigationService.addUser(user).subscribe(response => {
        console.log(response);
        // Reset the form
        this.addUserForm.reset();
        // Show success message
        this.message = 'User added successfully!';
      }, error => {
        console.log(error);
      });
    }
  }
  
  
}
