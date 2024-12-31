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
    url: '/categories',
    iconComponent: { name: 'cil-list' }
  },
  {
    name: 'Users',
    url: '/users',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Languages',
    url: '/languages',
    iconComponent: { name: 'cil-language' }
  },
  {
    name: 'Settings',
    url: '/settings',
    iconComponent: { name: 'cil-settings' }
  },
  {
    name: 'Log out',
    url: '/logout',
    iconComponent: { name: 'cil-account-logout' }
  }
];
