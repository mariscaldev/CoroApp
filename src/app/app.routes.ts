import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'cancion/:id',
    loadComponent: () => import('./pages/cancion/cancion.page').then(m => m.CancionPage)
  },
  {
    path: 'listas',
    loadComponent: () => import('./pages/listas/listas.page').then(m => m.ListasPage)
  },
  {
    path: 'lista/:id',
    loadComponent: () => import('./pages/lista-detalle/lista-detalle.page').then(m => m.ListaDetallePage)
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage)
  },
];
