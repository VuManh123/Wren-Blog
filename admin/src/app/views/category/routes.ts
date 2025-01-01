import { Routes } from '@angular/router';

import { CategoryComponent } from './category.component';

export const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    data: {
      title: 'Categories'
    }
  }
];
