import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SearchBlogComponent } from '../../components/search-blog/search-blog.component';
import { CommonModule } from '@angular/common';
import { HeaderOwnerComponent } from '../../components/header-owner/header-owner.component';

@Component({
  selector: 'app-search-blog',
  standalone: true,
  imports: [HeaderOwnerComponent, FooterComponent,SearchBlogComponent, HeaderComponent, CommonModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  hasToken: boolean = false;

  ngOnInit(): void {
    // Kiểm tra xem token có trong localStorage hay không
    this.hasToken = !!localStorage.getItem('token');
  }
}
