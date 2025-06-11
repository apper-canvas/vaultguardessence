import Home from '../pages/Home';
import Vault from '../pages/Vault';
import Generator from '../pages/Generator';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: 'Home',
    component: Home
  },
  vault: {
    id: 'vault',
    label: 'Vault',
    path: '/vault',
    icon: 'Shield',
    component: Vault
  },
  generator: {
    id: 'generator',
    label: 'Generator',
    path: '/generator',
    icon: 'Key',
    component: Generator
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: Settings
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    path: '/404',
    icon: 'AlertCircle',
    component: NotFound
  }
};

export const routeArray = Object.values(routes);