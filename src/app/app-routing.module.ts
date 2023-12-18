import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './ExtraPages/page404/page404.component';

const routes: Routes = [
  {
    path: 'matieres',
    loadChildren: () => import('./modules/matieres/matieres.module').then(m => m.MatieresModule)
  },
  {
    path: 'themes',
    loadChildren: () => import('./modules/matieres/matieres.module').then(m => m.MatieresModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', component: Page404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



 }
