import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-employee-items',
  templateUrl: './employee-items.component.html',
  styleUrls: ['./employee-items.component.css']
})
export class EmployeeItemsComponent implements OnInit {
  items: Item[] = [];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.getAllItems().subscribe((items: Item[]) => {
      this.items = items;
      this.items.sort((a, b) => a.id - b.id); // Sort by id in ascending order
      console.log(this.items); // Log retrieved items
    });
  }
}
