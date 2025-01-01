import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultHeaderComponent } from '.';
import { navItems } from './_nav';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet
  ]
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  constructor(private router: Router) {}

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
  onSidebarNavClick(event: Event) {
    const target = event.target as HTMLElement;
    
    // Kiểm tra xem có phải mục "Log out" không
    if (target && target.innerText === 'Log out') {
      this.onLogout();
    }
  }
  onLogout() {
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      // Nếu người dùng xác nhận, xóa token và chuyển hướng
      localStorage.removeItem('authToken'); // Hoặc sessionStorage.removeItem('authToken');

      // Chuyển hướng đến trang login
      this.router.navigate(['/login']);
    } else {
      // Nếu người dùng không xác nhận, không làm gì cả
      console.log('Logout canceled');
    }
  }
}
