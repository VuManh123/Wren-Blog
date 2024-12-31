import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  name: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.name, this.password).subscribe({
      next: () => {
        this.router.navigate(['/user']);
      },
      error: () => {
        this.errorMessage = 'Sai tên đăng nhập hoặc mật khẩu!';
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);  // Điều hướng đến trang đăng ký
  }
}
