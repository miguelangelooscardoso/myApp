import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Category } from '../models/category';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl = "https://localhost:7275/api/ArtShop/";

  constructor(private http: HttpClient) { }

  getCategoryList(){
    let url = this.baseUrl + 'GetCategoryList'
    return this.http.get<any[]>(url).pipe(
      map((categories)=>
      categories.map((category)=>{
        let mappedCategory: Category = {
          id: category.id,
          category: category.category,
          artist: category.artist, // ???
        };
        return mappedCategory;
      })
      )
    );
  }
}

