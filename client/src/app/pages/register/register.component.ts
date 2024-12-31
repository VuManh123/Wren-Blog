import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  passwordAgain: string = ''; // Link avatar image
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    if(this.password != this.passwordAgain) {
      this.errorMessage = 'Password bạn nhập lại không đúng';
      return;
    }
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Đăng ký thành công:', response);
        alert('Đăng ký thành công!')
        this.router.navigate(['/login']); // Điều hướng sang trang đăng nhập sau khi đăng ký thành công
      },
      error: (error) => {
        console.error('Lỗi đăng ký:', error);
        this.errorMessage = 'Đã có lỗi xảy ra trong quá trình đăng ký!';
      }
    });
  }
}
