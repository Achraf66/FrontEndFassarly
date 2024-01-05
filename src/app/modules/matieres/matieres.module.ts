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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorrectionVideoModalComponent } from './modals/correction-video-modal/correction-video-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExamenComponent } from './lessonComponents/examen/examen.component';
import { LessonsComponent } from './lessonComponents/lessons/lessons.component';
import { CalendarComponent } from './lessonComponents/calendar/calendar.component';
import { EventdetailsmodalComponent } from './modals/eventdetailsmodal/eventdetailsmodal.component';
import { EditUserDetailsStudentComponent } from './modals/edit-user-details-student/edit-user-details-student.component';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
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
    EventdetailsmodalComponent,
    EditUserDetailsStudentComponent,
  ],
  imports: [
    CommonModule,
    MatieresRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    HttpClientModule,
    FormsModule,
    ListboxModule,
    DropdownModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    ImageModule


    ],
    providers: [DialogService,MessageService,ConfirmationService],

})
export class MatieresModule { }
