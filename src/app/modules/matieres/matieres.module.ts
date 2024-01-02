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
import { CorrectionVideoModalComponent } from './modals/correction-video-modal/correction-video-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExamenComponent } from './lessonComponents/examen/examen.component';
import { LessonsComponent } from './lessonComponents/lessons/lessons.component';
import { CalendarComponent } from './lessonComponents/calendar/calendar.component';
registerLocaleData(localear,'ar');
/***********************************************************/
export function momentAdapterFactory() {
  return adapterFactory(moment);
};
@NgModule({
  declarations: [
    ThemesComponent,
    MatieresComponent,
    LessonComponent,
    CorrectionVideoModalComponent,
    ExamenComponent,
    LessonsComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    MatieresRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    HttpClientModule,
    FormsModule

    ],
    providers: [DialogService,MessageService,ConfirmationService],

})
export class MatieresModule { }
