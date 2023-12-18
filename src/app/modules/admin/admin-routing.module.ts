import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashComponent } from './admindash/admindash.component';

const routes: Routes = [
  

  {path:'admindashboard' , component:AdmindashComponent},
  {
    path: 'matiere',
    loadChildren: () => import('./adminmodules/matieres/matieres.module').then(m => m.MatieresModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
