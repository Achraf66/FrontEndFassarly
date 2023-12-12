import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { MatieresRoutingModule } from './matieres-routing.module';
import { ThemesComponent } from './themes/themes.component';
import { MatieresComponent } from './matieres/matieres.component';
import { LessonComponent } from './lesson/lesson.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

/***************Register AR for calendar********************/
import localear from '@angular/common/locales/ar'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
registerLocaleData(localear,'ar');
/***********************************************************/
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
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    HttpClientModule,
    FormsModule

    ]
})
export class MatieresModule { }
