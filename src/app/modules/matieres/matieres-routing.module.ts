import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatieresComponent } from './matieres/matieres.component';
import { ThemesComponent } from './themes/themes.component';
import { LessonComponent } from './lesson/lesson.component';

const routes: Routes = [

  { path: 'matieres', component: MatieresComponent,pathMatch:"full"},
  { path: 'themes', component: ThemesComponent,pathMatch:"full"},
  { path: 'lesson', component: LessonComponent,pathMatch:"full"}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatieresRoutingModule { }
