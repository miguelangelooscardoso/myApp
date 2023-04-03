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

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.navigationService.getUsers()
      .subscribe(users => {
        this.users = users.map((user: any) => {
          return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            roles: [user.role]
          };
        });
      });
  }
  
  
}
