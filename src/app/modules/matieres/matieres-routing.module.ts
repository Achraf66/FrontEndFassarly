import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatieresComponent } from './matieres/matieres.component';
import { ThemesComponent } from './themes/themes.component';
import { LessonComponent } from './lesson/lesson.component';
import { AuthGuard } from '../auth/guard/auth.guard';

const routes: Routes = [

  { path: 'matieres', component: MatieresComponent,},
  { path: 'themes', component: ThemesComponent,},
  { path: 'lesson', component: LessonComponent,},
  { path: 'themes/:matiereid', component: ThemesComponent,canActivate:[AuthGuard] },
  // { path: 'lesson/:matiereid/:themeid', component: LessonComponent,},
  { path: 'lesson/:matiereid/:themeid/:lessonid', component: LessonComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatieresRoutingModule { }
