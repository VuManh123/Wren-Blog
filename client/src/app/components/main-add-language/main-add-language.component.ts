import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';  // Thêm ActivatedRoute
import Quill from 'quill';
import { AddPostService } from '../../services/addpost.service';

@Component({
  selector: 'app-main-add-language',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-add-language.component.html',
  styleUrls: ['./main-add-language.component.css']
})
export class MainAddLanguageComponent implements OnInit {
  @ViewChild('editor') editor!: ElementRef;
  editorInstance!: Quill;

  post = {
    title: '',
    languageId: null,
    content: '',
    image: '',
  };
  languages: { id: number, code: string, name: string, flag: string }[] = [];
  blogId: number | null = null; // Thêm blogId

  constructor(
    private addPostService: AddPostService,
    private router: Router,
    private route: ActivatedRoute  // Thêm ActivatedRoute vào constructor
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.getBlogIdFromRoute();  
  }

  ngAfterViewInit(): void {
    this.initEditor();
  }

  private loadInitialData(): void {
    this.addPostService.getLanguages().subscribe({
      next: (response) => {
        if (response?.success && Array.isArray(response?.data)) {
          this.languages = response.data.map((item: any) => ({
            id: item.id,
            code: item.code,
            name: item.name,
            flag: item.flag
          }));
        } else {
          console.error('Dữ liệu không hợp lệ');
        }
      },
      error: (err) => console.error('Không thể tải danh mục:', err)
    });
  }

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

    const toolbar: any = this.editorInstance.getModule('toolbar');
    toolbar.addHandler('image', () => this.selectImage());

    this.editorInstance.on('text-change', () => {
      this.post.content = this.editorInstance.root.innerHTML;
    });
  }

  selectImage(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) this.uploadImage(file);
    };
  }

  uploadImage(file: File): void {
    this.addPostService.uploadImage(file).subscribe({
      next: (response) => {
        if (response.url) {
          const imageUrl = response.url;
          const range = this.editorInstance.getSelection();

          if (range !== null) {
            this.editorInstance.insertEmbed(range.index, 'image', imageUrl);
            this.post.image = imageUrl;
          }
        }
      },
      error: (err) => console.error('Upload ảnh thất bại:', err)
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    // Kiểm tra thông tin bài viết
    if (!this.validatePost(this.post)) {
      alert('Vui lòng điền đầy đủ thông tin bài viết.');
      return;
    }

    // Kiểm tra blogId đã được lấy
    if (!this.blogId) {
      alert('Blog ID không hợp lệ.');
      return;
    }

    const postData = {
      title: this.post.title,
      main_content: this.post.content,
      language_id: this.post.languageId
    };

    this.addPostService.submitLanguage(postData, this.blogId).subscribe({
      next: () => {
        alert('Thêm ngôn ngữ thành công!');
        this.router.navigate(['/my-blog']);
      },
      error: (err) => {
        alert('Đăng ngôn ngữ thất bại.');
        console.error(err);
      }
    });
  }

  private validatePost(post: any): boolean {
    return !!(post.title && post.languageId && post.content);
  }

  // Lấy blogId từ URL thông qua ActivatedRoute
  private getBlogIdFromRoute(): void {
    this.route.params.subscribe(params => {
      this.blogId = +params['blogId'];  // Lấy blogId từ tham số URL
    });
  }
}
