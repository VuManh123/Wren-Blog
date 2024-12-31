import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CategoryService, Category } from '../../services/category.service';
import { ArticleService, Article } from '../../services/blog.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, AfterViewInit {
  categories: Category[] = [];
  articles: Article[] = [];
  filteredArticles: any[] = [];  // Bài viết đã lọc
  searchInput: string = ''; 

  constructor(private categoryService: CategoryService, private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    // Lấy dữ liệu cho categories từ service
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        if (response.success && response.data) {
          this.categories = response.data; // Trích xuất mảng data
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    )

    // Gọi service để lấy dữ liệu articles
    this.articleService.getArticles().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.articles = response.data;
        } else {
          console.error('Invalid response format for articles:', response);
        }
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    const sliderContainer = document.querySelector('[data-slider-container]') as HTMLElement;
    const sliderPrevBtn = document.querySelector('[data-slider-prev]') as HTMLElement;
    const sliderNextBtn = document.querySelector('[data-slider-next]') as HTMLElement;

    let currentSlidePos = 0;
    const sliderItems = sliderContainer?.children as HTMLCollectionOf<HTMLElement>;

    // Di chuyển slider
    const moveSlider = (position: number) => {
      // Đảm bảo rằng không di chuyển quá phạm vi
      if (position < 0) {
        position = sliderItems.length - 1;
      } else if (position >= sliderItems.length) {
        position = 0;
      }

      // Chuyển slider bằng cách dịch chuyển container mà không cần hiệu ứng
      sliderContainer.style.transform = `translateX(-${position * 100}%)`;
    };

    // Lắng nghe sự kiện cho nút Prev
    sliderPrevBtn?.addEventListener('click', () => {
      currentSlidePos--;
      moveSlider(currentSlidePos);
    });

    // Lắng nghe sự kiện cho nút Next
    sliderNextBtn?.addEventListener('click', () => {
      currentSlidePos++;
      moveSlider(currentSlidePos);
    });
  }
  onSearch(): void {
    // Chuyển hướng đến URL với content từ `searchInput`
    if (this.searchInput.trim()) {
      this.router.navigate(['/search', this.searchInput]);
    } else {
      // Nếu input rỗng, chuyển hướng đến trang tìm kiếm mặc định
      this.router.navigate(['/search']);
    }
  }
}
