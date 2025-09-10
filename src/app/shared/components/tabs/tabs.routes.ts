import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('@pages/list.events.scene/list.events.page').then((m) => m.ListEventsScenePage),
      },
      {
        path: 'tab2',
        loadComponent: () => import('@pages/create.events.page/create.events.page').then((m) => m.CreateEventsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
