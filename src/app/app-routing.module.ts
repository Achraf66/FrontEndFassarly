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
  { path: '**', component: Page404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



 }
