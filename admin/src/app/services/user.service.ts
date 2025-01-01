import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AddAdminRequest } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  addUser(user: AddAdminRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  updateUserStatus(id: number, active: number): Observable<any> {
    const payload = { active }; // Chỉ gửi thuộc tính active
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }  
  checkEmailExists(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-email/${email}`);
  }
}
