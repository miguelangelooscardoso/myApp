import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-employee-items',
  templateUrl: './employee-items.component.html',
  styleUrls: ['./employee-items.component.css']
})
export class EmployeeItemsComponent implements OnInit {
  items: Item[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  myForm: FormGroup;

  constructor(private navigationService: NavigationService,
    private fb: FormBuilder) {
    this.myForm = this.fb.group({
      myField: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.navigationService.getAllItems().subscribe((items: Item[]) => {
      this.items = items;
      this.items.sort((a, b) => a.id - b.id); // Sort by id in ascending order
      console.log(this.items); // Log retrieved items
    });

    this.myForm = new FormGroup({
      // newItemId: new FormControl(), // if you need this control
      newItemTitle: new FormControl(),
      newItemArtist: new FormControl(),
      newItemCategory: new FormControl(),
      newItemQuantity: new FormControl(),
      newItemPrice: new FormControl(),
      newItemDiscount: new FormControl()
    });
  }

  onSubmit(itemData: any) {
    console.log('Pre-Request body:', itemData); // Log the pre request body
    const newItem = {
      title: itemData.newItemTitle,
      itemCategory: {
        category: itemData.newItemCategory,
        // artistCategory: itemData.newItemArtist // Update property name here
        artist: itemData.newItemArtist // Update property name here
      },
      offer: {
        title: itemData.newItemDiscount,
        // discount: itemData.newItemDiscount
      },
      price: itemData.newItemPrice,
      quantity: itemData.newItemQuantity,
      // imageName: itemData.newItemImageName
      imageName: '',
      description: '',
    };
    console.log('Request body:', newItem); // Log the request body
    
    this.navigationService.insertItem(newItem).subscribe(
      (res) => {
        console.log('Insertion success:', res);
        console.log('Item inserted successfully');
        // Do something with the response, e.g. display a success message
      },
      (error) => {
        console.error('Error inserting item:', error);
        // Do something with the error, e.g. display an error message
      }
    );
  }

  addItem() {
    const itemData = this.myForm.value;
    this.onSubmit(itemData);
    this.myForm.reset();
  }

  // Method to get the items for the current page
  getItemsForCurrentPage(): Item[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.items.slice(startIndex, endIndex);
  }

  // Method to update the current page
  updatePage(page: number): void {
    this.currentPage = page;
  }

  // Method to get the total number of pages
  getTotalPages(): number[] {
    const totalItems = this.items.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
