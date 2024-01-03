import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatieresComponent } from './matieres/matieres.component';
import { ThemesComponent } from './themes/themes.component';
import { LessonComponent } from './lesson/lesson.component';
import { AuthGuard } from '../auth/guard/auth.guard';

const routes: Routes = [

  { path: 'matieres', component: MatieresComponent,pathMatch:"full"},
  { path: 'themes', component: ThemesComponent,pathMatch:"full"},
  { path: 'lesson', component: LessonComponent,pathMatch:"full"},
  { path: 'themes/:matiereid', component: ThemesComponent,pathMatch:"full",canActivate:[AuthGuard] },
  // { path: 'lesson/:matiereid/:themeid', component: LessonComponent,pathMatch:"full"},
  { path: 'lesson/:matiereid/:themeid/:lessonid', component: LessonComponent,pathMatch:"full"},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatieresRoutingModule { }
