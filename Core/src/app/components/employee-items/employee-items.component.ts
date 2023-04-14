import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-employee-items',
  templateUrl: './employee-items.component.html',
  styleUrls: ['./employee-items.component.css']
})
export class EmployeeItemsComponent implements OnInit {
  categories: Category[] = [];

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService.getCategoryList().subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories); // Log retrieved categories
    });
  }
  
  // getCategoryClass(category: Category): string {
  //   // Replace 'category.category' with the actual property name of category's name
  //   // Use a switch statement or any other logic to determine the class based on the category name
  //   // Example logic: 
  //   switch (category.category) {
  //       case 'Category1':
  //           return 'category1-class';
  //       case 'Category2':
  //           return 'category2-class';
  //       default:
  //           return '';
  // }

}

