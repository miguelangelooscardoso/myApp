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
        artist: 'Rui',
      },
    },
    {
      backgroundImage: '/ceramics.jpeg',
      category: {
        id: 1,
        category: 'ceramics',
        artist: 'Paulo',
      },
    },
    {
      backgroundImage: '/ceramics.jpeg',
      category: {
        id: 2,
        category: 'ceramics',
        artist: 'Bernardo',
      },
    },
    {
      backgroundImage: '/glass.jpeg',
      category: {
        id: 1,
        category: 'glass',
        artist: '',
      },
    },
    {
      backgroundImage: '/glass.jpeg',
      category: {
        id: 0,
        category: 'glass',
        artist: 'Maria',
      },
    },
    {
      backgroundImage: '/glass.jpeg',
      category: {
        id: 1,
        category: 'glass',
        artist: 'José',
      },
    },
    {
      backgroundImage: '/glass.jpeg',
      category: {
        id: 1,
        category: 'glass',
        artist: 'Leandro',
      },
    },
    {
      backgroundImage: '/painting.jpeg',
      category: {
        id: 2,
        category: 'painting',
        artist: 'Luísa',
      },
    },
    {
      backgroundImage: '/painting.jpeg',
      category: {
        id: 2,
        category: 'painting',
        artist: 'Manuel',
      },
    },
    {
      backgroundImage: '/painting.jpeg',
      category: {
        id: 2,
        category: 'painting',
        artist: 'Paula',
      },
    },
    {
      backgroundImage: '/sculpture.jpeg',
      category: {
        id: 3,
        category: 'sculpture',
        artist: 'Leonor',
      },
    },
    {
      backgroundImage: '/sculpture.jpeg',
      category: {
        id: 3,
        category: 'sculpture',
        artist: 'Beatriz',
      },
    },
    {
      backgroundImage: '/sculpture.jpeg',
      category: {
        id: 3,
        category: 'sculpture',
        artist: 'Maria do Mar',
      },
    },
    {
      backgroundImage: '/textile.jpeg',
      category: {
        id: 4,
        category: 'textile',
        artist: 'Conceição',
      },
    },
    {
      backgroundImage: '/textile.jpeg',
      category: {
        id: 4,
        category: 'textile',
        artist: 'Gelson',
      },
    },
    {
      backgroundImage: '/textile.jpeg',
      category: {
        id: 4,
        category: 'textile',
        artist: 'Nate',
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
