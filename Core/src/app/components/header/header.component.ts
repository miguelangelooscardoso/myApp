import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Category } from 'src/app/models/category';
import { NavigationItem } from 'src/app/models/navigation-item';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navigationList: NavigationItem[] = [];
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  cartItems: number = 0;
  userRole: string = ''; // Add userRole property to store the role value

  constructor(
    private navigationService: NavigationService,
    public utilityService: UtilityService,
    private roleService: RoleService
  ) {
  }

  ngOnInit(): void {
    // Get category list
    this.navigationService.getCategoryList().subscribe((list: Category[]) => {
      for (let item of list) {
        let present = false;
        for (let navItem of this.navigationList) {
          if (navItem.category === item.category) {
            navItem.artists.push(item.artistCategory);
            present = true;
          }
        }
        if (!present) {
          this.navigationList.push({
            category: item.category,
            artists: [item.artistCategory],
          });
        }
      }
    });

    // Cart
    if (this.utilityService.isLoggedIn()) {
      this.navigationService
        .getActiveCartOfUser(this.utilityService.getUser().id)
        .subscribe((res: any) => {
          this.cartItems = res.cartItems.length;
        });
    }

    this.utilityService.changeCart.subscribe((res: any) => {
      console.log('Cart updated:', res); // Add this log statement
      if (parseInt(res) === 0) this.cartItems = 0;
      else this.cartItems += parseInt(res);
    });

    // Call checkRole() from RoleService and get role information
    this.roleService.role$.subscribe((role: string) => {
      this.userRole = role; // Store the role value in userRole property
    });
  }

  // Modal inside OnInit
  openModal(name: string) {
    this.container.clear()

    let componentType!: Type<any>;
    if (name === 'login') {
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Login Information';
    };
    if (name === 'register') {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Register Information';
    };

    this.container.createComponent(componentType);
  }
}
