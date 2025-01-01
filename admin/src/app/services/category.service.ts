import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoryAddRequest, CategoryRequest } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  addCategory(category: CategoryAddRequest): Observable<any> {
    console.log(category);
    return this.http.post(this.apiUrl, category);
  }
  updateCategory(id: number, category: CategoryRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, category);
  }  
}
