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
    artist: '',
  };

  @HostListener('click') openItems() {
    this.router.navigate(['/items'], {
      queryParams:{
        category: this.category.category,
        artist: this.category.artist,
      },
    });
  }

  constructor(private router: Router) { }

}
