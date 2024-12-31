import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    login(name: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/login`, { name, password }).pipe(
            tap((response: any) => {
                console.log('Token nhận được:', response.token); // Debug token
                localStorage.setItem('token', response.token); // Lưu token
                localStorage.setItem('name', response.name);
            }),
            catchError(error => {
                console.error('Login error', error);
                return throwError(error);
            })
        );
    }
    // Hàm giải mã token và lấy userId
    decodeToken(): number {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token không tồn tại.');
            return 0;
        }

        try {
            const decoded: any = jwtDecode(token);
            console.log('Decoded token:', decoded);
            return decoded.id; // Lấy userId từ payload của token
        } catch (error) {
            console.error('Lỗi khi giải mã token:', error);
            return 0;
        }
    }

    getUserProfile(): Observable<any> {
        const token = localStorage.getItem('token');
        if (!token) {
            return throwError('Không có token');
        }

        return this.http.get('http://localhost:3000/api/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).pipe(
            catchError(err => {
                console.error('Lỗi lấy thông tin profile:', err);
                return throwError(err);
            })
        );
    }


    isLoggedIn(): boolean {
        return !!localStorage.getItem('token'); // Kiểm tra token
    }

    logout(): void {
        localStorage.removeItem('token'); // Xóa token
    }

    register(
        name: string,
        email: string,
        password: string,
    ): Observable<any> {
        const userData = { name, email, password};
        return this.http.post(`${this.apiUrl}/auth/register`, userData).pipe(
            tap((response: any) => {
                console.log('Đăng ký thành công:', response);
            }),
            catchError((error) => {
                console.error('Register error', error);
                return throwError(error);
            })
        );
    }
}

