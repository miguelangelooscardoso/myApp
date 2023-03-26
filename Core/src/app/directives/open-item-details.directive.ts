import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[OpenItemDetails]',
})
export class OpenItemDetailsDirective {
  @Input() itemId: number = 0;
  @HostListener('click') openItemDetails() {
    window.scrollTo(0, 0);
    this.router.navigate(['/item-details'], {
      queryParams: {
        id: this.itemId,
      },
    });
  }
  constructor(private router: Router) {}
}