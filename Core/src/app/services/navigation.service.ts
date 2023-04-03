import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Category } from '../models/category';
import { map } from 'rxjs';
import { User } from '../models/user';
import { PaymentMethod } from '../models/payment-method';
import { Payment } from '../models/payment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl = "https://localhost:7275/api/ArtShop/";
  usersUrl = "https://localhost:7275/api/UserManagement/";

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.usersUrl + 'GetAllUser');
  }

  getCategoryList() {
    let url = this.baseUrl + 'GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.category,
            artistCategory: category.artistCategory,
          };
          return mappedCategory;
        })
      )
    );
  }
  
  getItems(category: string, artist: string, count: number) {
    return this.http.get<any[]>(this.baseUrl + 'GetItems', {
      params: new HttpParams()
        .set('category', category)
        .set('artist', artist)
        .set('count', count),
    });
  }

  getItem(id: number) {
    let url = this.baseUrl + "GetItem/" + id;
    return this.http.get(url);
  }

  registerUser(user: User) {
    let url = this.baseUrl + "RegisterUser";
    return this.http.post(url, user, {responseType: 'text'});
  }

  // loginUser(email: string, password: string) {
  //   let url = this.usersUrl + "Login"
  //   return this.http.post(
  //     url,
  //     {Email: email, Password: password},
  //     {responseType: 'text'}
  //   );
  // }

  submitFeedback(userid: number, itemid: number, feedback: string) {
    let obj: any = {
      User: {
        Id: userid,
      },
      Item: {
        Id: itemid,
      },
      Value: feedback
    };

    let url = this.baseUrl + "InsertFeedback";
    return this.http.post(url, obj, { responseType: 'text' });
  }

  getAllFeedbacksOfItem(itemId: number) {
    let url = this.baseUrl + 'GetItemFeedbacks/' + itemId;
    return this.http.get(url);
  }

  addToCart(userid: number, itemid: number){
    let url = this.baseUrl + 'InsertCartItem/' + userid + '/' + itemid;
    return this.http.post(url, null, {responseType: 'text'});
  }

  getActiveCartOfUser(userid: number) {
    let url = this.baseUrl + 'GetActiveCartOfUser/' + userid;
    return this.http.get(url);
  }

  getAllPreviousCarts(userid: number) {
    let url = this.baseUrl + 'GetAllPreviousCartsOfUser/' + userid;
    return this.http.get(url);
  }

  getPaymentMethods() {
    let url = this.baseUrl + 'GetPaymentMethods';
    return this.http.get<PaymentMethod[]>(url);
  }

  insertPayment(payment: Payment) {
    return this.http.post(this.baseUrl + 'InsertPayment', payment, {responseType: 'text'});
  }

  insertOrder(order: Order) {
    return this.http.post(this.baseUrl + 'InsertOrder', order);
  }
}

