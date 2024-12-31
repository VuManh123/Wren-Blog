import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { AddPostService } from '../../services/addpost.service'; // Đảm bảo đường dẫn đúng

@Component({
  selector: 'app-main-edit-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-edit-blog.component.html',
  styleUrls: ['./main-edit-blog.component.css'],
})
export class MainEditBlogComponent implements OnInit {
  @ViewChild('editor') editor!: ElementRef;
  editorInstance!: Quill;

  blogId: number | null = null;
  languages: { id: number; name: string }[] = [];
  blogContents: { language_id: number; title: string; main_content: string; id: number, language: { id: number, name: string } }[] = [];
  selectedLanguageId: number | null = null;
  currentBlogContent = { title: '', main_content: '', languageId: null as number | null, contentId: null as number | null };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addPostService: AddPostService
  ) {}

  ngOnInit(): void {
    this.getBlogIdFromRoute();
  }

  ngAfterViewInit(): void {
    this.initEditor();
  }

  // Lấy blogId từ route params
  private getBlogIdFromRoute(): void {
    this.route.params.subscribe((params) => {
      this.blogId = +params['blogId'];
      if (this.blogId) {
        this.loadBlogContents();
      }
    });
  }

  private loadBlogContents(): void {
    if (!this.blogId) return;

    this.addPostService.getBlogContents(this.blogId).subscribe({
      next: (response) => {
        this.blogContents = response.data;

        // Tạo danh sách ngôn ngữ từ dữ liệu trả về
        this.languages = this.blogContents.map((content) => ({
          id: content.language.id,
          name: content.language.name,
          flag: '' // Có thể thêm đường dẫn ảnh cờ nếu cần
        }));

        // Chọn ngôn ngữ mặc định (ngôn ngữ của bài viết đầu tiên)
        if (this.languages.length) {
          this.selectedLanguageId = this.languages[0].id; // Mặc định chọn ngôn ngữ đầu tiên
        }

        this.setCurrentBlogContent();
      },
      error: (err) => console.error('Error loading blog contents:', err),
    });
  }

  // Cập nhật nội dung blog theo ngôn ngữ đã chọn
  private setCurrentBlogContent(): void {
    if (!this.selectedLanguageId) return; // Kiểm tra nếu chưa chọn ngôn ngữ
    
    // Tìm nội dung blog tương ứng với ngôn ngữ đã chọn
    const content = this.blogContents.find(
      (bc) => bc.language.id === this.selectedLanguageId
    );
  
    if (content) {
      // Nếu tìm thấy nội dung tương ứng với ngôn ngữ đã chọn
      this.currentBlogContent = {
        title: content.title,
        main_content: content.main_content,
        languageId: content.language.id,
        contentId: content.id,
      };
    } else {
      // Nếu không tìm thấy, tạo một nội dung trống cho ngôn ngữ mới
      this.currentBlogContent = {
        title: '',
        main_content: '',
        languageId: this.selectedLanguageId,
        contentId: null,
      };
    }
  
    // Cập nhật nội dung editor nếu đã có editor instance
    if (this.editorInstance) {
      this.editorInstance.root.innerHTML = this.currentBlogContent.main_content || '';
    }
  }

  // Khởi tạo Quill editor
  private initEditor(): void {
    this.editorInstance = new Quill(this.editor.nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline'],
          ['link', { align: [] }],
          ['image', 'blockquote', 'code-block'],
        ],
      },
    });

    this.editorInstance.on('text-change', () => {
      this.currentBlogContent.main_content = this.editorInstance.root.innerHTML;
    });
  }

  // Xử lý khi người dùng thay đổi ngôn ngữ
  onLanguageChange(event: Event): void {
    this.selectedLanguageId = +(event.target as HTMLSelectElement).value;
    this.setCurrentBlogContent(); // Cập nhật nội dung bài viết theo ngôn ngữ đã chọn
  }
  

  // Xử lý khi người dùng gửi form
  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.blogId || !this.selectedLanguageId || !this.currentBlogContent.contentId) {
      alert('Invalid blog or language selection.');
      return;
    }

    const postData = {
      blog_id: this.blogId,
      content_id: this.currentBlogContent.contentId,
      title: this.currentBlogContent.title,
      main_content: this.currentBlogContent.main_content,
      language_id: this.currentBlogContent.languageId,
    };

    this.addPostService.updateBlogContent(postData).subscribe({
      next: () => {
        alert('Blog updated successfully!');
        this.router.navigate(['/my-blog']);
      },
      error: (err) => console.error('Error updating blog:', err),
    });
  }
}
