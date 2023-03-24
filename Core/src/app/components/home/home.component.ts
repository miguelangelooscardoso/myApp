import { Component, OnInit } from '@angular/core';
import { PopularItem } from 'src/app/models/popular-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  popularItems: PopularItem[] = [
    {
      backgroundImage: '/ceramics.jpeg',
      category: {
        id: 1,
        category: 'ceramics',
        artistCategory: 'Nina Malterud',
      },
    },
    {
      backgroundImage: '/glass.jpeg',
      category: {
        id: 3,
        category: 'glass',
        artistCategory: 'Celia Dowson',
      },
    },
    {
      backgroundImage: '/painting.jpeg',
      category: {
        id: 6,
        category: 'painting',
        artistCategory: 'Hola Lou',
      },
    },
    {
      backgroundImage: '/sculpture.jpeg',
      category: {
        id: 10,
        category: 'sculpture',
        artistCategory: 'Vhils',
      },
    },
    {
      backgroundImage: '/textile.jpeg',
      category: {
        id: 12,
        category: 'textile',
        artistCategory: 'Claire Benn',
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
