import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatieresComponent } from './matieres/matieres.component';
import { ThemesComponent } from './themes/themes.component';
import { LessonComponent } from './lesson/lesson.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { OffersComponent } from './offers/components/offers/offers.component';
import { LiveSessionsThemeComponent } from './live-sessions-theme/live-sessions-theme.component';

const routes: Routes = [

  { path: 'matieres', component: MatieresComponent,},
  { path: 'themes', component: ThemesComponent,},
  { path: 'lesson', component: LessonComponent,},
  { path: 'themes/:matiereid', component: ThemesComponent,canActivate:[AuthGuard] },
  { path: 'lesson/:matiereid/:themeid/:lessonid', component: LessonComponent,canActivate:[AuthGuard]},
  { path: 'offers', component: OffersComponent,pathMatch:'full'},
  { path: 'livesessionstheme/:matiereid', component: LiveSessionsThemeComponent,pathMatch:'full'},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatieresRoutingModule { }
