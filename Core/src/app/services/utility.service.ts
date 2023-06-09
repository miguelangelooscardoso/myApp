import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { Cart } from '../models/cart';
import { Item } from '../models/item';
import { Payment } from '../models/payment';
import { User } from '../models/user';
import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  changeCart = new Subject();

  constructor(
    private navigationService: NavigationService,
    private jwt: JwtHelperService,
    private router: Router) { }

  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);
    return finalPrice;
  }

  // JWT Helper Service : npm install @auth0/angular-jwt

  // getUser(): User {
  //   let token = this.jwt.decodeToken();
  //   let user: User = {
  //     id: token.id,
  //     firstName: token.firstName,
  //     lastName: token.lastName,
  //     address: token.address,
  //     mobile: token.mobile,
  //     email: token.email,
  //     password: '',
  //     createdAt: token.createdAt,
  //     modifiedAt: token.modifiedAt,
  //   };
  //   return user;
  // }

  getUser(): User {
    let token = this.jwt.decodeToken();
    console.log('Decoded token:', token); // succeeded
    let user: User = {
      id: token.sub,
      fullName: token.fullName,
      email: token.name,
      password: token.password,
      roles: token.role
    };
    return user;
  }

  setUser(token: string) {
    localStorage.setItem('user', token);
  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('user');
    // Add logic for redirection to home page
    // For example, using Angular Router:
    this.router.navigate(['/home']);
  }

  addToCart(item: Item) {
    let itemid = item.id;
    let userid = this.getUser().id;

    this.navigationService.addToCart(userid, itemid).subscribe((res) => {
      if (res.toString() === 'inserted') this.changeCart.next(1);
    });
  }

  removeFromCart(item: Item) {
    let itemid = item.id;
    let userid = this.getUser().id;
  
    this.navigationService.removeFromCart(userid, itemid).subscribe((res) => {
      if (res.toString() === 'removed') this.changeCart.next(-1);
    });
  }
  

  calculatePayment(cart: Cart, payment: Payment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;

    for (let cartitem of cart.cartItems) {
      payment.totalAmount += cartitem.item.price;

      payment.amountReduced +=
        cartitem.item.price -
        this.applyDiscount(
          cartitem.item.price,
          cartitem.item.offer.discount
        );

      payment.amountPaid += this.applyDiscount(
        cartitem.item.price,
        cartitem.item.offer.discount
      );
    }

    if (payment.amountPaid > 1000) payment.shippingCharges = 50;
    else if (payment.amountPaid > 500) payment.shippingCharges = 10;
    else if (payment.amountPaid > 250) payment.shippingCharges = 5;
    else if (payment.amountPaid > 0 && payment.amountPaid < 250) payment.shippingCharges = 5;
    else payment.shippingCharges = 0;
  }

  calculatePricePaid(cart: Cart) {
    let pricepaid = 0;
    for (let cartitem of cart.cartItems) {
      pricepaid += this.applyDiscount(
        cartitem.item.price,
        cartitem.item.offer.discount
      );
    }
    return pricepaid;
  }
}
