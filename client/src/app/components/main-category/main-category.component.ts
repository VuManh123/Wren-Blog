import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CategoryService, Category } from '../../services/category.service';
import { ArticleService, Article } from '../../services/blog.service';
import { Subscription } from 'rxjs';  // Import Subscription


@Component({
  selector: 'app-main-category',
  standalone: true,
  imports: [RouterLink, NgFor, CommonModule],
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainCategoryComponent implements OnInit {
  categories: Category[] = [];
  articles: Article[] = [];
  categoryId!: number;
  private routeSub!: Subscription;
  currentPage: number = 0; // trang hiện tại
  itemsPerPage: number = 3; // số lượng bài viết mỗi trang

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private articleService: ArticleService) { }

  ngOnInit(): void {
    // Lắng nghe sự thay đổi của categoryId trong URL
    this.routeSub = this.route.params.subscribe(params => {
      // Lấy categoryId từ URL khi nó thay đổi
      this.categoryId = +params['id'];  // Chuyển đổi sang số
      this.loadArticlesByCategory(this.categoryId);  // Gọi lại API khi categoryId thay đổi
    });

    // Lấy dữ liệu cho categories
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        if (response.success && response.data) {
          // Loại bỏ category trùng với categoryId hiện tại
          this.categories = response.data.filter((category: Category) => category.id !== this.categoryId);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

    // Lấy `id` của category từ URL
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    // Gọi API hoặc lấy dữ liệu từ JSON và lọc bài viết theo category
    this.articleService.getArticles().subscribe(
      (response) => {
        if (response.success && response.data) {
          // Lọc các bài viết theo categoryId nếu có categoryId từ URL
          if (this.categoryId) {
            this.articles = response.data.filter((article: Article) => article.category.id === this.categoryId);
          } else {
            this.articles = response.data; // Nếu không có categoryId, lấy tất cả bài viết
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

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category'; // Trả về tên hoặc 'Unknown' nếu không tìm thấy
  }

  loadArticlesByCategory(categoryId: number): void {
    // Gọi API để lấy bài viết theo categoryId
    this.articleService.getArticles().subscribe(
      (response) => {
        if (response.success && response.data) {
          // Lọc các bài viết theo categoryId nếu có categoryId từ URL
          if (this.categoryId) {
            this.articles = response.data.filter((article: Article) => article.category.id === this.categoryId);
          } else {
            this.articles = response.data; // Nếu không có categoryId, lấy tất cả bài viết
          }
        } else {
          console.error('Invalid response format for articles:', response);
        }
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
    // Lấy dữ liệu cho categories
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        if (response.success && response.data) {
          // Loại bỏ category trùng với categoryId hiện tại
          this.categories = response.data.filter((category: Category) => category.id !== this.categoryId);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Hủy đăng ký subscription khi component bị hủy
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
