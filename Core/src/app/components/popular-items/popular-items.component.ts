import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-popular-items',
  templateUrl: './popular-items.component.html',
  styleUrls: ['./popular-items.component.css']
})
export class PopularItemsComponent implements OnInit {
  @Input() category: Category = {
    id: 0,
    category: '',
    artistCategory: '',
  };
  @Input() count: number = 3;
  items: Item[] = [];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService
      .getItems(
        this.category.category,
        this.category.artistCategory,
        this.count
      )
      .subscribe((res: any[]) => {
        for (let item of res) {
          this.items.push(item);
        }

        console.log('Category:', this.category.category); // Log 'category' value
        console.log('Artist Category:', this.category.artistCategory); // Log 'artistCategory' value
        console.log('Items:', this.items); // Log 'items' array
      });
  }
}

