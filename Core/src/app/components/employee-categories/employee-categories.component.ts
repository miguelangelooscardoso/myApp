import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-employee-categories',
  templateUrl: './employee-categories.component.html',
  styleUrls: ['./employee-categories.component.css']
})
export class EmployeeCategoriesComponent {
  categories: Category[] = [];
  newCategoryForm!: FormGroup;

  constructor(private router: Router, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.getCategoryList().subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories); // Log retrieved categories
    });
    // Define newCategoryForm here
    this.newCategoryForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      artistCategory: new FormControl('', [Validators.required]),
      // description: new FormControl('', [Validators.required])
    });

  }

  deleteCategory(categoryId: number) {
    if (confirm("Are you sure you want to delete this category?")) {
      this.navigationService.deleteCategory(categoryId).subscribe(() => {
        console.log(`Category with ID ${categoryId} deleted.`);
        // Remove the following line:
        // this.loadCategories();
      });
    }
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
  //   }
  // }

  addNewCategory(): void {
    if (this.newCategoryForm.valid) {
      const category = {
        id: 0,
        category: this.newCategoryForm.controls['category'].value,
        artist: this.newCategoryForm.controls['artistCategory'].value,
      };
      this.navigationService.addCategory(category).subscribe(() => {
        console.log('Category added successfully');
        this.newCategoryForm.reset();
        // reload the category list
        this.navigationService.getCategoryList().subscribe((categories: Category[]) => {
          this.categories = categories;
        });
      }, (error) => {
        console.error('Failed to add category:', error);
      });
    } else {
      console.log('Invalid form');
    }
  }
  

}
