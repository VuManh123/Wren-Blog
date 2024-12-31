import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ArticleService, Article } from '../../services/blog.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './search-blog.component.html',
  styleUrls: ['./search-blog.component.css'],
})
export class SearchBlogComponent implements OnInit {
  articlesAll: Article[] = [];
  articles: Article[] = [];
  searchTerm: string = '';  // Từ khóa tìm kiếm
  searchInput!: string;
  searchInputThisPage: string = ''; 

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.searchInput = this.route.snapshot.paramMap.get('content') || ''; // Nếu null, đặt giá trị mặc định là chuỗi rỗng

    // Gọi service để lấy dữ liệu articles
    this.articleService.getArticles().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.articlesAll = response.data;
  
          // Nếu `searchInput` rỗng thì hiển thị toàn bộ danh sách bài viết
          if (!this.searchInput.trim() || this.searchInput === null) {
            this.articles = this.articlesAll;
          } else {
            // Lọc danh sách bài viết theo tiêu chí
            this.articles = this.articlesAll.filter((article: Article) =>
              article.title.toLowerCase().includes(this.searchInput.toLowerCase())
            );
          }
        } else {
          console.error('Invalid response format for articles:', response);
        }
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }

  onSearch(): void {
    if (this.searchInputThisPage.trim()) {
      // Cập nhật URL mà không reload
      this.router.navigate(['/search', this.searchInputThisPage], { replaceUrl: true });
  
      // Lọc lại danh sách bài viết
      this.articles = this.articlesAll.filter((article: Article) =>
        article.title.toLowerCase().includes(this.searchInputThisPage.toLowerCase())
      );
    } else {
      this.articles = this.articlesAll; // Hiển thị toàn bộ nếu input trống
    }
  }
  
}
