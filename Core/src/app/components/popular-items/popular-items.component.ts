import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-popular-items',
  templateUrl: './popular-items.component.html',
  styleUrls: ['./popular-items.component.css']
})
export class PopularItemsComponent {
  @Input() category: Category = {
    id: 0,
    category: '',
    artist: ''
  };

  @Input() count: number = 3;
  constructor(){}
  
  ngOnInit(): void{}

}
