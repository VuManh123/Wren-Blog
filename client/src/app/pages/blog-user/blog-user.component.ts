import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MainComponent } from '../../components/main/main.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-user',
  standalone: true,
  imports: [HeaderComponent, MainComponent, FooterComponent, CommonModule],
  templateUrl: './blog-user.component.html',
  styleUrl: './blog-user.component.css'
})
export class BlogUserComponent implements OnInit {
  username: string = 'Người dùng';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Lấy thông tin từ token hoặc backend nếu cần
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
