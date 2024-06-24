import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./pages/authentication/authentication.page.module').then(
        (ref) => ref.AuthenticationPageModule
      )
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.page.module').then((ref) => ref.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {}
