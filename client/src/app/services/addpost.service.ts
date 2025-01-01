import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>('https://wren-blog.onrender.com/categories');
  }


  getLanguages(): Observable<any> {
    return this.http.get<any>('https://wren-blog.onrender.com/languages');
  }

  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    // Gửi POST request tới endpoint upload ảnh
    return this.http.post<{ url: string }>(`https://wren-blog.onrender.com/api/upload/upload`, formData);
  }

  submitPost(post: any): Observable<any> {
    return this.http.post(`https://wren-blog.onrender.com/posts`, post);
  }

  submitLanguage(postData: any, blogId: number): Observable<any> {
    return this.http.post(`https://wren-blog.onrender.com/posts/${blogId}/add-language`, postData);
  }
  
  getBlogContents(blogId: number): Observable<any> {
    return this.http.get(`https://wren-blog.onrender.com/posts/${blogId}/contents`);
  }

  updateBlogContent(postData: any): Observable<any> {
    const { blog_id, content_id, ...payload } = postData;
    return this.http.put(`https://wren-blog.onrender.com/posts/${blog_id}/contents/${content_id}`, payload);
  }
}
