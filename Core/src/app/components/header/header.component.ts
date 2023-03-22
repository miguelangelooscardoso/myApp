import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Category } from 'src/app/models/category';
import { NavigationItem } from 'src/app/models/navigation-item';
import { NavigationService } from 'src/app/services/navigation.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  navigationList: NavigationItem[] = [
    {
      category: 'ceramics',
      artists: ["Rui", "Paulo", "Bernardo"]
    },
    {
      category: 'glass',
      artists: ["Maria", "José", "Leandro"]
    },
    {
      category: 'painting',
      artists: ["Luísa", "Manuel", "Paula"]
    },
    {
      category: 'sculpture',
      artists: ["Leonor", "Beatriz", "Maria do Mar"]
    },
    {
      category: 'textile',
      artists: ["Conceição", "Gelson", "Nate"]
    }
  ];

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit(): void {
    // Get category list
    this.navigationService.getCategoryList().subscribe((list: Category[]) => {
      for (let item of list) {
        let present = false;
        for (let navItem of this.navigationList) {
          if (navItem.category === item.category) {
            navItem.artists.push(item.artist);
            present = true;
          }
        }
        if (!present) {
          this.navigationList.push({
            category: item.category,
            artists: [item.artist],
          })
        }
      }
    });
  }

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
