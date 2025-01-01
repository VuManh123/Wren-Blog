import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        canActivate: [AuthGuard] // Bảo vệ route này bằng AuthGuard
      },
      {
        path: 'category',
        loadChildren: () => import('./views/category/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./views/user/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'language',
        loadChildren: () => import('./views/language/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./views/settings/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      }
    ]
  },
  
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
