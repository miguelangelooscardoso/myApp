import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';

@Directive({
  selector: '[OpenItems]'
})
export class OpenItemsDirective {
  @Input() category: Category = {
    id:0,
    category: '',
    Artist: '',
  };

  @HostListener('click') openItems() {
    this.router.navigate(['/items'], {
      queryParams:{
        category: this.category.category,
        artist: this.category.Artist,
      },
    });
  }

  constructor(private router: Router) { }

}
