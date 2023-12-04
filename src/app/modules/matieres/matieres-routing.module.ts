import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatieresComponent } from './matieres/matieres.component';

const routes: Routes = [

  { path: 'matieres', component: MatieresComponent,pathMatch:"full"},
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatieresRoutingModule { }
