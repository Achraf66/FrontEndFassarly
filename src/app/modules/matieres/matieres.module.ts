import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatieresRoutingModule } from './matieres-routing.module';
import { ThemesComponent } from './themes/themes.component';
import { MatieresComponent } from './matieres/matieres.component';
import { LessonComponent } from './lesson/lesson.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
export function momentAdapterFactory() {
  return adapterFactory(moment);
};
@NgModule({
  declarations: [
    ThemesComponent,
    MatieresComponent,
    LessonComponent
  ],
  imports: [
    CommonModule,
    MatieresRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })

    ]
})
export class MatieresModule { }
