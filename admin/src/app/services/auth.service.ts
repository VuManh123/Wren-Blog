import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = `${environment.apiUrl}/api/auth/login-admin`;
private apiUrlRegister = `${environment.apiUrl}/api/auth/register-admin`;

  constructor(private http: HttpClient) {}

  login(name: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { name, password });
  }
  register(name: string,email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrlRegister}`, { name, password, email });
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token); // Lưu token vào LocalStorage
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); // Lấy token từ LocalStorage
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Xóa token khi đăng xuất
  }
}
