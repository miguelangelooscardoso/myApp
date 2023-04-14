import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-employee-offers',
  templateUrl: './employee-offers.component.html',
  styleUrls: ['./employee-offers.component.css']
})
export class EmployeeOffersComponent implements OnInit {
  offers!: Offer[];

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    this.navigationService.getAllOffers()
      .subscribe((offers: Offer[]) => {
        this.offers = offers;
      });
  }
}
