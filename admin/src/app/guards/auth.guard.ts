import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
      return true; // Cho phép truy cập nếu có token
    } else {
      this.router.navigate(['/login']); // Chuyển hướng đến trang đăng nhập
      return false;
    }
  }
}
