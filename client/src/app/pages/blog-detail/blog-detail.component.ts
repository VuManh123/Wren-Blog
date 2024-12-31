import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MainBlogDetailComponent } from '../../components/main-blog-detail/main-blog-detail.component';
import { HeaderOwnerComponent } from '../../components/header-owner/header-owner.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    HeaderOwnerComponent,
    FooterComponent,
    CommonModule,
    MainBlogDetailComponent,
  ],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  hasToken: boolean = false;

  ngOnInit(): void {
    // Kiểm tra xem token có trong localStorage hay không
    this.hasToken = !!localStorage.getItem('token');
  }
}
