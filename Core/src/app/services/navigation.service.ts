import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Category } from '../models/category';
import { map } from 'rxjs';

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
            Artist: category.Artist, // ???
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
}

