import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guard/auth.guard';

const routes: Routes = [
  {
    path: 'matieres',
    loadChildren: () => import('./modules/matieres/matieres.module').then(m => m.MatieresModule) , canActivate: [AuthGuard]
  },
  {
    path: 'themes',
    loadChildren: () => import('./modules/matieres/matieres.module').then(m => m.MatieresModule), canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard],
    data: { roles: ['admin'] } 
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: '', redirectTo:'matieres/matieres',pathMatch:'full' 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule {



 }
