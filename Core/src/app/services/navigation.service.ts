import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Category } from '../models/category';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { PaymentMethod } from '../models/payment-method';
import { Payment } from '../models/payment';
import { Order } from '../models/order';
import { Item } from '../models/item';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl = "https://localhost:7275/api/ArtShop/";
  usersUrl = "https://localhost:7275/api/UserManagement/";

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(this.usersUrl + 'GetAllUser');
  }

  // addUser(newUser: User) {
  //   return this.http.post<User>(this.usersUrl, newUser);
  // }

  addUser(user: User) {
    let url = this.usersUrl + "AddUser";
    const headers = { 'Content-Type': 'application/json', 'charset': 'utf-8' }
    const requestBody = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      Role: user.roles
    };
    console.log("Request Body: ", requestBody);
    return this.http.post(url, requestBody, { responseType: 'text' })
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
    const headers = { 'Content-Type': 'application/json', 'charset': 'utf-8' }
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

  getCategoryList(): Observable<Category[]> {
    let url = this.baseUrl + 'GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) => {
        console.log('Retrieved Categories:', categories); // Log retrieved categories
        return categories.map((category) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.category,
            artistCategory: category.artist || '', // Update to use 'artist' property
          };
          console.log('Mapped Category:', {
            id: category.id,
            category: category.category,
            artistCategory: category.artist || '', // Update to use 'artist' property
          }); // Log id, category, and artistCategory
          return mappedCategory;
        });
      })
    );
  }

  addCategory(category: { id: number, category: string, artist: string }): Observable<any> {
    const url = this.baseUrl + 'AddCategory';
    return this.http.post(url, category);
  }

  deleteCategory(id: number): Observable<any> {
    const url = `${this.baseUrl}DeleteCategory/${id}`;
    return this.http.delete(url);
  }


  getItems(category: string, artist: string, count: number) {
    return this.http.get<any[]>(this.baseUrl + 'GetItems', {
      params: new HttpParams()
        .set('category', category)
        .set('artist', artist)
        .set('count', count),
    });
  }

  // getAllItems() {
  //   return this.http.get<any[]>(this.baseUrl + 'GetAllItems', {
  //     params: new HttpParams()
  //   });
  // }

  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'GetAllItems', {
      params: new HttpParams()
    }).pipe(
      map((items) => {
        return items.map((item) => {
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            itemCategory: {
              id: item.itemCategory.id,
              category: item.itemCategory.category,
              artistCategory: item.itemCategory.artist // Update property name here
            },
            offer: {
              id: item.offer.id,
              title: item.offer.title,
              discount: item.offer.discount
            },
            price: item.price,
            quantity: item.quantity,
            imageName: item.imageName
          };
        });
      }),
      tap((res: any[]) => {
        console.log('Fetch All Items Result:', res); // Log the result
      }),
      catchError((error) => {
        console.error('Fetch All Items Error:', error); // Log the error
        throw error;
      })
    );
  }

  insertItem(item: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'InsertItem', item).pipe(
      tap((res) => {
        console.log('Insert Item Result:', res); // Log the result
      }),
      catchError((error) => {
        console.error('Insert Item Error:', error); // Log the error
        throw error;
      })
    ).pipe(
      tap((res) => {
        console.log('Insert Item Request Body:', JSON.stringify(res.request.body)); // Log the request body
        console.log('Insert Item Response Body:', JSON.stringify(res.body)); // Log the response body
      })
    );
  }

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}DeleteItem/${itemId}`).pipe(
      tap((res) => {
        console.log(`Item with ID ${itemId} deleted successfully.`);
      }),
      catchError((error) => {
        console.error(`Error deleting item with ID ${itemId}: ${error}`);
        throw error;
      })
    );
  }

  getAllOffers() {
    return this.http.get<any[]>(this.baseUrl + 'GetAllOffers', {
      params: new HttpParams()
    });
  }

  addOffer(offer: Offer): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'AddOffer', offer);
  }

  removeOffer(offerId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'RemoveOffer/' + offerId);
  }

  // getItem(id: number) {
  //   let url = this.baseUrl + "GetItem/" + id;
  //   return this.http.get(url);
  // }

  getItem(id: number): Observable<Item> {
    let url = this.baseUrl + "GetItem/" + id;
    return this.http.get<any>(url).pipe(
      map((item) => {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          itemCategory: {
            id: item.itemCategory.id,
            category: item.itemCategory.category,
            artistCategory: item.itemCategory.artist // Update property name here
          },
          offer: {
            id: item.offer.id,
            title: item.offer.title,
            discount: item.offer.discount
          },
          price: item.price,
          quantity: item.quantity,
          imageName: item.imageName
        } as Item; // Cast the result to the front-end Item model
      }),
      tap((res: Item) => {
        console.log('Fetch Item Result:', res); // Log the result
      }),
      catchError((error) => {
        console.error('Fetch Item Error:', error); // Log the error
        throw error;
      })
    );
  }


  registerUser(user: User) {
    let url = this.usersUrl + "Register";
    return this.http.post(url, user, { responseType: 'text' });
  }

  // loginUser(email: string, password: string) {
  //   let url = this.usersUrl + "Login"
  //   return this.http.post(
  //     url,
  //     {Email: email, Password: password},
  //     {responseType: 'text'}
  //   );
  // }

  // submitFeedback(userId: number, itemId: number, feedbackValue: string) {
  //   console.log('Submitting feedback - User ID:', userId);
  //   console.log('Submitting feedback - Item ID:', itemId);
  //   console.log('Submitting feedback - Feedback Value:', feedbackValue);
  
  //   let obj: any = {
  //     UserId: userId,
  //     ItemId: itemId,
  //     Feedback: feedbackValue,
  //     CreatedAt: new Date().toISOString()
  //   };
  
  //   let url = this.baseUrl + "InsertFeedback";
  //   return this.http.post(url, obj, { responseType: 'text' }).pipe(
  //     tap((res) => {
  //       console.log('Submit Feedback Result:', res); // Log the result
  //     }),
  //     catchError((error) => {
  //       console.error('Submit Feedback Error:', error); // Log the error
  //       throw error;
  //     })
  //   );
  // }

  submitFeedbackWithParams(params: HttpParams) {
    return this.http.post<any>(
      `${this.baseUrl}InsertFeedback`, 
      {},
      { params: params }
    );
  }

  // getAllFeedbacksOfItem(itemId: number) {
  //   console.log('Getting feedbacks for Item ID:', itemId);

  //   let url = this.baseUrl + 'GetItemFeedbacks/' + itemId;
  //   return this.http.get(url).pipe(
  //     tap((res: any) => {
  //       console.log('Fetch All Feedbacks Result:', res); // Log the result
  //     }),
  //     catchError((error) => {
  //       console.error('Fetch All Feedbacks Error:', error); // Log the error
  //       throw error;
  //     })
  //   );
  // }

  getAllFeedbacksOfItem(itemId: number): Observable<any[]> {
    console.log('Getting feedbacks for Item ID:', itemId);

    let url = this.baseUrl + 'GetItemFeedbacks/' + itemId;
    return this.http.get<any[]>(url).pipe(
      map((feedbacks) => {
        return feedbacks.map((feedback) => {
          return {
            id: feedback.id,
            user: {
              id: feedback.user.id,
              fullName: feedback.user.fullName,
              dateCreated: feedback.user.dateCreated,
              dateModified: feedback.user.dateModified,
              userName: feedback.user.userName,
              normalizedUserName: feedback.user.normalizedUserName,
              email: feedback.user.email,
              normalizedEmail: feedback.user.normalizedEmail,
              emailConfirmed: feedback.user.emailConfirmed,
              passwordHash: feedback.user.passwordHash,
              securityStamp: feedback.user.securityStamp,
              concurrencyStamp: feedback.user.concurrencyStamp,
              phoneNumber: feedback.user.phoneNumber,
              phoneNumberConfirmed: feedback.user.phoneNumberConfirmed,
              twoFactorEnabled: feedback.user.twoFactorEnabled,
              lockoutEnd: feedback.user.lockoutEnd,
              lockoutEnabled: feedback.user.lockoutEnabled,
              accessFailedCount: feedback.user.accessFailedCount
            },
            item: {
              id: feedback.item.id,
              title: feedback.item.title,
              description: feedback.item.description,
              itemCategory: {
                id: feedback.item.itemCategory.id,
                category: feedback.item.itemCategory.category,
                artistCategory: feedback.item.itemCategory.artist
              },
              offer: {
                id: feedback.item.offer.id,
                title: feedback.item.offer.title,
                discount: feedback.item.offer.discount
              },
              price: feedback.item.price,
              quantity: feedback.item.quantity,
              imageName: feedback.item.imageName
            },
            value: feedback.value,
            createdAt: feedback.createdAt
          };
        });
      }),
      tap((res: any[]) => {
        console.log('Fetch All Feedbacks Result:', res); // Log the result
      }),
      catchError((error) => {
        console.error('Fetch All Feedbacks Error:', error); // Log the error
        throw error;
      })
    );
  }

  addToCart(userid: number, itemid: number) {
    let url = this.baseUrl + 'InsertCartItem/' + userid + '/' + itemid;
    return this.http.post(url, null, { responseType: 'text' });
  }

  removeFromCart(userid: number, itemid: number) {
    const url = this.baseUrl + 'RemoveCartItem/' + userid + '/' + itemid;
    return this.http.delete(url, { responseType: 'text' });
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
    return this.http.post(this.baseUrl + 'InsertPayment', payment, { responseType: 'text' });
  }

  insertOrder(order: Order) {
    return this.http.post(this.baseUrl + 'InsertOrder', order);
  }
}

