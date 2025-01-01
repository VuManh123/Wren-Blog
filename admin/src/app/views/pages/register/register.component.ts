import { Component, NgModule, ViewChild } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { ToastersComponent } from '../../notifications/toasters/toasters.component';
import { NgStyle } from '@angular/common';
import { CardGroupComponent,} from '@coreui/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [NgStyle, CardGroupComponent, ToastersComponent, FormsModule, ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class RegisterComponent {
  @ViewChild(ToastersComponent) toastComponent!: ToastersComponent;
  constructor(private authService: AuthService, private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  // Khai báo các biến để chứa giá trị form
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Hàm xử lý đăng ký tài khoản
  onRegister(): void {
    // Kiểm tra các trường hợp lỗi (ví dụ: password và confirm password không trùng khớp)
    if (this.password !== this.confirmPassword) {
      this.toastComponent.addToastWithParams('Error', 'Password and confirm password do not match!', 'danger', 'top-end', true);
      return;
    }
    if (!this.username || !this.email || !this.confirmPassword || !this.password) {
      this.toastComponent.addToastWithParams('Error', 'Please fill all infomations', 'danger', 'top-end', true);
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.toastComponent.addToastWithParams('Success', 'Register a admin account successfully.', 'success', 'top-end', true);
        // Chuyển hướng sang màn hình đăng nhập hoặc trang chủ
      },
      (error) => {
        if (error.status === 400 && error.error?.message === 'Email already exists') {
          // Xử lý lỗi email đã tồn tại
          this.toastComponent.addToastWithParams('Error', 'The email is already in use. Please try another email.', 'danger', 'top-end', true);
        } else if (error.status === 400 && error.error?.message === 'Username already exists') {
          // Xử lý các lỗi khác
          this.toastComponent.addToastWithParams('Error', 'The username is already in use. Please try another username.', 'danger', 'top-end', true);
        } else{
          this.toastComponent.addToastWithParams('Error', 'Error registering account admin.', 'danger', 'top-end', true);
        }
        console.error('Error registering user:', error);
      }
    );
  }
}
