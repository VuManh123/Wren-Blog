import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddLanguageRequest, Language } from './language.model';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  private apiUrl = `${environment.apiUrl}/languages`; // Endpoint cho languages API

  constructor(private http: HttpClient) {}

  // Phương thức gọi API để lấy danh sách languages
  getLanguages(): Observable<any> {
    return this.http.get(this.apiUrl); 
  }
  deleteLanguage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  addLanguage(language: AddLanguageRequest): Observable<any> {
    return this.http.post(this.apiUrl, language);
  }
  updateLanguageStatus(id: number, status: string): Observable<any> {
    const payload = { status }; // Chỉ gửi thuộc tính status
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }  
}
