import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Category } from '../models/category';
import { map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl = "https://localhost:7275/api/ArtShop/";

  constructor(private http: HttpClient) { }

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

  loginUser(email: string, password: string) {
    let url = this.baseUrl + "LoginUser"
    return this.http.post(
      url,
      {Email: email, Password: password},
      {responseType: 'text'}
    );
  }

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
}

