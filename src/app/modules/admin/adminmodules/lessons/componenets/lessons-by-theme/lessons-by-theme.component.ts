import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Lesson } from '../../Lesson';
import { LessonService } from '../../services/lesson.service';
import { AddNewLessonAndAffectToThemeComponent } from '../add-new-lesson-and-affect-to-theme/add-new-lesson-and-affect-to-theme.component';
import { MenuService } from '../../../users/services/MenuService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpResponse } from '@angular/common/http';
import { EditLessonComponent } from '../edit-lesson/edit-lesson.component';

@Component({
  selector: 'app-lessons-by-theme',
  templateUrl: './lessons-by-theme.component.html',
  styleUrls: ['./lessons-by-theme.component.css']
})
export class LessonsByThemeComponent implements OnInit{
  showConfirmationDialogLesson: boolean = false;

  idTheme:any
  nomTheme:any
  LessonList:Lesson[]=[]
  ngOnInit(): void {
    

    this.menu.newItemAdded$.subscribe(() => {
      this.fetchLessonsByidTheme(this.idTheme);
    });
  }

  constructor(
    public config: DynamicDialogConfig,
    private lessonService:LessonService,
    private dialogService:DialogService,
    private menu:MenuService,private confirmationService:ConfirmationService,
    private messageService:MessageService,
    ){

  this.idTheme = this.config.data.idTheme
  this.nomTheme = this.config.data.nomTheme
  
  this.fetchLessonsByidTheme(this.idTheme);
  
  }



  fetchLessonsByidTheme(idTheme:number){
    this.lessonService.getLessonsByThemeId(idTheme).subscribe(
      (data)=>{
        this.LessonList = data
      },(error)=>{
        console.log(error)
      }
    )

  }


  public OpenAddLessonAndAffectToTheme(): void {
    this.dialogService.open(AddNewLessonAndAffectToThemeComponent, {
      header: 'إضافة درس جديد لهذا المحور',
      width: '40%',
      height: '80%',
      dismissableMask: true,
      data: {
        ThemeId: this.idTheme,
        nomTheme: this.nomTheme
      },
      style: {
        'direction': 'rtl'
      }
    });
  }





  public OpenEditLesson(LessonId:number): void {
    this.dialogService.open(EditLessonComponent,{
      header: 'تغير بيانات الدرس',
      width: '40%',
      height: '80%',
      dismissableMask: true,
      data: {
        ThemeId: this.idTheme,
        nomTheme: this.nomTheme,
        LessonId:LessonId
      },
      style: {
        'direction': 'rtl'
      }
    });
  }


  deleteLessonById(LessonId: number) {
    this.showConfirmationDialogLesson = true;

    this.confirmationService.confirm({
        message: 'هل تريد فعلاً حذف هذا الدرس؟',
        header: 'تأكيد الحذف',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        acceptLabel: 'نعم',
        rejectLabel: 'لا',
        acceptButtonStyleClass: 'p-button-success',
        rejectButtonStyleClass: 'p-button-danger',
        accept: () => {
          this.showConfirmationDialogLesson = false;

            this.lessonService.deleteLessonById(LessonId).subscribe(
                (data: any) => {
                    if (data.message === 'Lesson supprimé avec succès') {
                        this.messageService.add({
                            severity: 'success',
                            summary: ' تم حذف الدرس بنجاح ',
                            detail: 'تم حذف الدرس بنجاح ',
                            life: 3000
                        });
                        this.closeModalAndNotify();
                    }
                },
                (error) => {
                    // Handle error, if needed
                }
            );
        },
        reject: () => {
          this.showConfirmationDialogLesson = false;
            this.messageService.add({
                severity: 'error',
                summary: 'لم يتم حذف الدرس',
                detail: 'لم يتم حذف الدرس',
                life: 3000
            });
        }
    });
}


closeModalAndNotify() {

  this.menu.triggerNewItemAdded();
}

private handleDownload(response: HttpResponse<ArrayBuffer>,examenname:string): void {
  // Check if the response has a valid body
  if (response.body !== null) {
    const blob = new Blob([response.body], { type: 'application/pdf' });

    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = examenname; 
    link.click();
  } else {
    console.error('Response body is null.');
  }
}

downloadPiecesJointes(themeId: number, lessonId: number) {

  this.lessonService.downloadPiecesJointes(themeId, lessonId)
    .subscribe(blob => {
      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.download = 'pieces_jointes.zip';

      document.body.appendChild(downloadLink);
      downloadLink.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(downloadLink);
    });
}
  
}
