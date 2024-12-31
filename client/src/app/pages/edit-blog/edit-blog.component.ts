import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MainEditBlogComponent } from '../../components/main-edit-blog/main-edit-blog.component';
@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [HeaderComponent, MainEditBlogComponent],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent {

}
