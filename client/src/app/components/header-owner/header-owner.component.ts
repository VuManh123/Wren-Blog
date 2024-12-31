import { Component,  AfterViewInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { AppUtilService } from '../../app-util.service';
@Component({
  selector: 'app-header-owner',
  standalone: true,
  imports: [IonicModule ,RouterLink],
  templateUrl: './header-owner.component.html',
  styleUrl: './header-owner.component.css',

})
export class HeaderOwnerComponent implements AfterViewInit {
  constructor(private appUtilService: AppUtilService) {}

  ngAfterViewInit(): void {
    const navbar = document.querySelector('[data-navbar]') as HTMLElement;
    const navTogglers = document.querySelectorAll('[data-nav-toggler]') as NodeListOf<HTMLElement>;

    // Thêm sự kiện cho các nút navbar
    navTogglers.forEach(toggler => {
      toggler.addEventListener('click', () => {
        // Toggling class active để mở/đóng menu
        navbar.classList.toggle('active');
        document.body.classList.toggle('nav-active');
      });
    });
  }
}
