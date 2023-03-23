import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-popular-items',
  templateUrl: './popular-items.component.html',
  styleUrls: ['./popular-items.component.css']
})
export class PopularItemsComponent {
  @Input() category: Category = {
    id: 0,
    category: '',
    Artist: '',
  };
  // number of popular items being displayed
  @Input() count: number = 3;
  items: Item[] = [];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService
    .getItems(
      this.category.category,
      this.category.Artist,
      this.count
    )
    .subscribe((res: any[]) => {
      for (let item of res) {
        this.items.push(item);
      }
    });
  }
}
