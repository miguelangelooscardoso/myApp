import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Offer } from 'src/app/models/offer';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-employee-offers',
  templateUrl: './employee-offers.component.html',
  styleUrls: ['./employee-offers.component.css']
})
export class EmployeeOffersComponent implements OnInit {
  offers!: Offer[];
  newOfferForm: FormGroup;

  constructor(private navigationService: NavigationService, private fb: FormBuilder) {
    this.newOfferForm = this.fb.group({
      title: ['', Validators.required],
      discount: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    this.navigationService.getAllOffers()
      .subscribe((offers: Offer[]) => {
        this.offers = offers;
      });
  }

  deleteOffer(offerId: number) {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.navigationService.removeOffer(offerId).subscribe(
        response => {
          // If the removal is successful, update the offers list in the component to remove the deleted offer
          this.offers = this.offers.filter(offer => offer.id !== offerId);
        },
        error => {
          // If there is an error during the removal, display an error message
          console.log(error);
          alert('There was an error deleting the offer.');
        }
      );
    }
  }

  addNewOffer(newOfferForm: FormGroup): void {
    if (this.newOfferForm.valid) {
      const newOffer: Offer = {
        id: 0,
        title: this.newOfferForm.value.title,
        discount: this.newOfferForm.value.discount
      };
      this.navigationService.addOffer(newOffer).subscribe(() => {
        this.offers.push(newOffer);
        this.newOfferForm.reset();
      });
    }
  }
  
}
