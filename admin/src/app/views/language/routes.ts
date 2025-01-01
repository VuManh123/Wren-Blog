import { Routes } from '@angular/router';

import { LanguageComponent } from './language.component';

export const routes: Routes = [
  {
    path: '',
    component: LanguageComponent,
    data: {
      title: 'Languages'
    }
  }
];
