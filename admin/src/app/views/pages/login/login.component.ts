import { Component, NgModule, ViewChild } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastersComponent } from '../../notifications/toasters/toasters.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ToastersComponent, FormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {
  @ViewChild(ToastersComponent) toastComponent!: ToastersComponent;
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      this.toastComponent.addToastWithParams('Error', 'Please fill all infomations', 'danger', 'top-end', true);
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        const token = response.token;
        this.authService.saveToken(token); // Lưu token
        this.toastComponent.addToastWithParams('Success', 'Login successfully', 'success', 'top-end', true);
        this.router.navigate(['/dashboard']); // Điều hướng đến dashboard
      },
      (error) => {
        console.error('Login failed:', error);
        if (error.status === 401) {
          this.errorMessage = error.error.message || 'Invalid username or password';
        } else {
          // Các lỗi khác (500, 404, v.v.)
          this.errorMessage = 'An unexpected error occurred.';
        }
        this.toastComponent.addToastWithParams('Error', 'Invalid username or password', 'danger', 'top-end', true);
      }
    );
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}