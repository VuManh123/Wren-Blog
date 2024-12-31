import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainCategoryComponent } from '../../components/main-category/main-category.component';
import { CommonModule } from '@angular/common';
import { HeaderOwnerComponent } from '../../components/header-owner/header-owner.component';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ HeaderComponent,FooterComponent,MainCategoryComponent, CommonModule, HeaderOwnerComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  hasToken: boolean = false;

  ngOnInit(): void {
    // Kiểm tra xem token có trong localStorage hay không
    this.hasToken = !!localStorage.getItem('token');
  }
  
}
