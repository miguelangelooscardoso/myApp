import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-employee-categories',
  templateUrl: './employee-categories.component.html',
  styleUrls: ['./employee-categories.component.css']
})
export class EmployeeCategoriesComponent {
  categories: Category[] = [];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.getCategoryList().subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories); // Log retrieved categories
    });
  }

  // deleteCategory(id: number): void {
  //   this.navigationService.deleteCategory(id).subscribe(() => {
  //     // Perform any additional actions after successful deletion
  //     console.log('Category deleted successfully');
  //   }, (error) => {
  //     console.error('Failed to delete category:', error);
  //   });
  // }

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
