import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsAuthenticated, IsNotAuthenticated } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [IsAuthenticated],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register',
    canActivate: [IsNotAuthenticated],
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    canActivate: [IsNotAuthenticated],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registerc',
    canActivate: [IsNotAuthenticated],
    loadChildren: () => import('./register-c/register-c.module').then( m => m.RegisterCPageModule)
  },
  {
    path: 'registern',
    canActivate: [IsNotAuthenticated],
    loadChildren: () => import('./register-n/register-n.module').then( m => m.RegisterNPageModule)
  },
  {
    path: 'results',
    canActivate: [IsAuthenticated],
    loadChildren: () => import('./results/results.module').then( m => m.ResultsPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
