import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  userForm!: FormGroup;

  constructor(private navigationService: NavigationService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getUsers();
    this.userForm = this.formBuilder.group({
      role: ["", Validators.required],
    });    
  }

  getUsers(): void {
    this.navigationService.getUsers().subscribe((users) => {
      this.users = users.map((user: any) => ({
        id: user.id!,
        fullName: user.fullName!,
        email: user.email!,
        password: user.password!,
        roles: [user.role!],
      }));
    }, (error) => {
      console.log('Error getting users:', error);
    });
  }

  updateRole(user: User): void {
    const role = this.userForm.get('role')!.value;
    console.log('user before update:', user);
    console.log('new role:', role);
    const requestBody = this.userForm.get('role')!.value as string;
    console.log('request body:', requestBody);
    this.navigationService.updateUserRole(user, requestBody).subscribe(
      (updatedUser) => {
        console.log('updated user:', updatedUser);
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        console.log('user index:', index);
        this.users[index] = updatedUser;
        console.log('updated users array:', this.users);
      },
      (error) => {
        console.log('Error updating user:', error);
      }
    );    
  }
  
  
  
  
  
  
  
  
  
}
