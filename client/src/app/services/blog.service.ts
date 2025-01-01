import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    name: string;
    profileImage: string;
  };
  blogContent: {
    id: number;
    title: string;
    introduction: string;
    mainContent: string;
    language: {
      id: number;
      name: string;
      flag: string;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly apiUrl = 'https://wren-blog.onrender.com/blogRequire';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<{ success: boolean; data: Article[] }> {
    return this.http.get<{ success: boolean; data: Article[] }>(this.apiUrl);
  }
}
