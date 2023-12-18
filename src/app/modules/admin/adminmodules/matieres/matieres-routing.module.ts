import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmatiereComponent } from './addmatiere/addmatiere.component';

const routes: Routes = [

{path:'addmatiere',component:AddmatiereComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatieresRoutingModule { }
