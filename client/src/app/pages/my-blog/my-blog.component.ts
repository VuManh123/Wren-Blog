import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.css'],
})
export class MyBlogComponent implements OnInit {
  blogs: any[] = []; // Danh sách bài viết
  userId: string | null = null; // ID của người dùng

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Lấy thông tin user từ AuthService
    this.authService.getUserProfile().subscribe(
      (profile) => {
        this.userId = profile.user.id; // Lấy userId từ thông tin profile
        this.getBlogsByUserId(); // Sau khi lấy userId, tải bài viết của người dùng này
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    );
  }

  // Lấy danh sách bài viết của người dùng theo userId
  getBlogsByUserId() {
    if (this.userId) {
      this.http
        .get<any>('https://wren-blog.onrender.com/blogRequire') // Địa chỉ API
        .subscribe(
          (response) => {
            if (response.success) {
              // Lọc bài viết dựa trên userId
              this.blogs = response.data.filter(
                (blog: any) => blog.author.id === Number(this.userId)
              );
            } else {
              console.error('Lỗi khi lấy danh sách bài viết:', response.message);
            }
          },
          (error) => {
            console.error('Lỗi khi gọi API lấy bài viết:', error);
          }
        );
    }
  }

  // Hàm xử lý sửa bài viết
  onEdit(blogId: number): void {
    this.router.navigate(['/edit-blog', blogId]);
  }

  // Hàm xử lý thêm ngôn ngữ
  addLanguage(blogId: number): void {
    this.router.navigate(['/add-language', blogId]);
  }

  // Hàm xử lý xóa bài viết
  onDelete(blogId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      this.http.delete(`https://wren-blog.onrender.com/posts/${blogId}`).subscribe(
        () => {
          // Cập nhật lại danh sách bài viết sau khi xóa
          this.blogs = this.blogs.filter((blog) => blog.id !== blogId);
        },
        (error) => {
          console.error('Lỗi khi xóa bài viết:', error);
        }
      );
    }
  }
}
