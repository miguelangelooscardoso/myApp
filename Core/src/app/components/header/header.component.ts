import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationItem } from 'src/app/models/navigation-item';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', {read: ViewContainerRef, static: true}) 
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

  constructor() {
  }

  ngOnInit(): void {
  }

  openModal(name: string) {
    this.container.clear()

    let componentType!: Type<any>;
    if( name === 'login') {
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Login Information';
    };
    if( name === 'register') {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Register Information';
    };

    this.container.createComponent(componentType);
  }
}
