import { Component } from '@angular/core';
import { MainNewBlogComponent } from '../../components/main-new-blog/main-new-blog.component';
import { HeaderComponent } from '../../components/header/header.component';
@Component({
  selector: 'app-new-blog',
  standalone: true,
  imports: [MainNewBlogComponent,HeaderComponent],
  templateUrl: './new-blog.component.html',
  styleUrl: './new-blog.component.css'
})
export class NewBlogComponent {

}