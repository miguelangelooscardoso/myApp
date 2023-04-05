import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Category } from '../models/category';
import { catchError, map, tap, throwError } from 'rxjs';
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

  // addUser(newUser: User) {
  //   return this.http.post<User>(this.usersUrl, newUser);
  // }

  addUser(user: User) {
    let url = this.usersUrl + "AddUser";
    const headers = {'Content-Type': 'application/json', 'charset': 'utf-8'}
    const requestBody = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      Role: user.roles
    };
    console.log("Request Body: ", requestBody);
    return this.http.post(url, requestBody, {responseType: 'text'})
      .pipe(
        tap(response => console.log("Add User Response: ", response)),
        catchError(error => {
          console.log("Add User Error: ", error);
          return throwError(error);
        })
      );
  }
  


  updateUser(user: User) {
    const url = `${this.usersUrl}UpdateUserRole/${user.id}`;
    return this.http.put<User>(url, user);
  }
  
  // updateUserRole(user: User, newRole: string) {
  //   const url = `${this.usersUrl}UpdateUserRole/${user.id}`;
  //   const requestBody = `"${newRole}"`
  //   console.log('requestBody:', requestBody);
  //   return this.http.put<User>(url, requestBody);
  // }

  updateUserRole(user: User, newRole: string) {
    const url = `${this.usersUrl}UpdateUserRole/${user.id}`;
    const requestBody = JSON.stringify(newRole);
    const headers = {'Content-Type': 'application/json', 'charset': 'utf-8'}
    return this.http.put<User>(url, requestBody, { headers }).pipe(
      tap((updatedUser) => console.log(updatedUser)),
      catchError((error) => {
        console.log('Error updating user:', error);
        return throwError(error);
      })
    );
  }

  deleteUser(id: number) {
    const url = `${this.usersUrl}DeleteUser/${id}`;
    return this.http.delete<User>(url);
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
    let url = this.usersUrl + "Register";
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

