import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { ArticleService, Article } from '../../services/blog.service';
import { Comment, CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-blog-detail',
  standalone: true,
  templateUrl: './main-blog-detail.component.html',
  styleUrls: ['./main-blog-detail.component.css'],
  imports: [CommonModule, FormsModule],
})
export class MainBlogDetailComponent implements OnInit {
  blog: any; // Blog chi tiết
  languages: string[] = []; // Danh sách ngôn ngữ có trong blog
  selectedLanguage: string = ''; // Ngôn ngữ hiện tại được chọn
  filteredBlogContent: any = null; // Nội dung blog lọc theo ngôn ngữ
  articleId!: number;
  userID!: number;
  comments: Comment[] = []; // Tất cả bình luận
  newCommentContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lấy ID bài viết từ route
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.articleId) {
      console.error('Invalid article ID');
      return;
    }

    // Gọi API để lấy dữ liệu blog
    this.articleService.getArticles().subscribe(
      (response) => {
        if (response.success && response.data) {
          // Lấy bài viết cụ thể
          this.blog = response.data.find((article: Article) => article.id === this.articleId);
          if (this.blog) {
            // Lấy danh sách ngôn ngữ từ blogContent
            this.languages = this.blog.blogContent.map((content: any) => content.language.name);

            // Đặt ngôn ngữ mặc định là ngôn ngữ đầu tiên
            if (this.languages.length > 0) {
              this.selectedLanguage = this.languages[0];
              this.updateFilteredContent();
            }
          }
        } else {
          console.error('Invalid response format for articles:', response);
        }
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );

    // Lấy dữ liệu cho comment
    this.commentService.getComments().subscribe(
      (response: any) => {
        if (response.success && response.data) {
          // Loại bỏ category trùng với categoryId hiện tại
          this.comments = response.data.filter((comment: Comment) => comment.blog_id == this.articleId);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Xử lý khi thay đổi ngôn ngữ
  onLanguageChange(event: Event): void {
    this.selectedLanguage = (event.target as HTMLSelectElement).value;
    this.updateFilteredContent();
  }

  // Cập nhật nội dung blog theo ngôn ngữ
  private updateFilteredContent(): void {
    if (this.blog && this.blog.blogContent) {
      this.filteredBlogContent = this.blog.blogContent.find(
        (content: any) => content.language.name === this.selectedLanguage
      );
    }
  }

  // Ham xu ly su kien post comment
  postNewComment(): void {
    if (!this.newCommentContent.trim()) {
      console.warn('Please fill your comment!');
      return;
    }
  
    this.userID = this.authService.decodeToken();
    console.log('UserId from token: ', this.userID);
    if (!this.userID) {
      console.log('User is not logged in, redirecting to login...');
      this.router.navigate(['/login']); // Chuyển hướng đến trang login
      alert('Login to comment this blog!')
      return; // Dừng việc thực hiện tiếp theo nếu không có token
    }
  
    const newComment = {
      content: this.newCommentContent.trim(),
      blog_id: this.articleId,
      user_id: this.userID
    };
  
    this.commentService.postComment(newComment).subscribe({
      next: (response) => {
        console.log('Bình luận đã được thêm:', response);
        this.newCommentContent = ''; // Reset input
  
        // Sau khi bình luận được thêm, gọi lại API để lấy danh sách bình luận mới nhất
        this.loadComments(); // Gọi lại phương thức loadComments để cập nhật danh sách bình luận
      },
      error: (err) => {
        console.error('Lỗi khi gửi bình luận:', err);
      },
    });
  }
  
  loadComments(): void {
    // Lấy lại danh sách bình luận sau khi thêm bình luận mới
    this.commentService.getComments().subscribe(
      (response: any) => {
        if (response.success && response.data) {
          // Lọc các bình luận theo blog_id hiện tại
          this.comments = response.data.filter((comment: Comment) => comment.blog_id == this.articleId);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }
  
}
