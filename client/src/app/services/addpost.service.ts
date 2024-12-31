import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/categories');
  }


  getLanguages(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/languages');
  }

  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    // Gửi POST request tới endpoint upload ảnh
    return this.http.post<{ url: string }>(`http://localhost:3000/api/upload/upload`, formData);
  }

  submitPost(post: any): Observable<any> {
    return this.http.post(`http://localhost:3000/posts`, post);
  }

  submitLanguage(postData: any, blogId: number): Observable<any> {
    return this.http.post(`http://localhost:3000/posts/${blogId}/add-language`, postData);
  }
  
  getBlogContents(blogId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/posts/${blogId}/contents`);
  }

  updateBlogContent(postData: any): Observable<any> {
    const { blog_id, content_id, ...payload } = postData;
    return this.http.put(`http://localhost:3000/posts/${blog_id}/contents/${content_id}`, payload);
  }
}
