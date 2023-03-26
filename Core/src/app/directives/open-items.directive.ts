import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';

@Directive({
  selector: '[OpenItems]',
})
export class OpenItemsDirective {
  @Input() category: Category = {
    id: 0,
    category: '',
    artistCategory: '',
  };

  @HostListener('click') openItems() {
    this.router.navigate(['/items'], {
      queryParams: {
        category: this.category.category,
        artist: this.category.artistCategory,
      },
    });
  }

  constructor(private router: Router) {}
}
