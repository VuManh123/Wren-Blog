import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Categories',
    url: '/category',
    iconComponent: { name: 'cil-list' }
  },
  {
    name: 'Users',
    url: '/user',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Languages',
    url: '/language',
    iconComponent: { name: 'cil-language' }
  },
  {
    name: 'Settings',
    url: '/settings',
    iconComponent: { name: 'cil-settings' }
  },
  {
    name: 'Log out',
    url: 'javascript:void(0)',  // Giữ URL là 'javascript:void(0)' để không điều hướng
    iconComponent: { name: 'cil-account-logout' }
  }
];

