import { Component } from '@angular/core';
import { PopularItem } from 'src/app/models/popular-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularItems: PopularItem[] = [
    {
      backgroundImage: '/ceramics.jpeg',
      category: {
        id: 0,
        category: 'ceramics',
        Artist: 'Nina Malterud',
      },
    },
    {
      backgroundImage: '/glass.jpeg',
      category: {
        id: 0,
        category: 'glass',
        Artist: 'Celia Dowson',
      },
    },
    {
      backgroundImage: '/painting.jpeg',
      category: {
        id: 0,
        category: 'painting',
        Artist: 'Hola Lou',
      },
    },
    {
      backgroundImage: '/sculpture.jpeg',
      category: {
        id: 0,
        category: 'sculpture',
        Artist: 'Vhils',
      },
    },
    {
      backgroundImage: '/textile.jpeg',
      category: {
        id: 0,
        category: 'textile',
        Artist: 'Claire Benn',
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
