import HomePage from '@/components/pages/HomePage';
import VaultPage from '@/components/pages/VaultPage';
import GeneratorPage from '@/components/pages/GeneratorPage';
import SettingsPage from '@/components/pages/SettingsPage';
import NotFoundPage from '@/components/pages/NotFoundPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: 'Home',
    component: HomePage
  },
  vault: {
    id: 'vault',
    label: 'Vault',
    path: '/vault',
    icon: 'Shield',
    component: VaultPage
  },
  generator: {
    id: 'generator',
    label: 'Generator',
    path: '/generator',
    icon: 'Key',
    component: GeneratorPage
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: SettingsPage
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    path: '/404',
    icon: 'AlertCircle',
    component: NotFoundPage
  }
};

export const routeArray = Object.values(routes);