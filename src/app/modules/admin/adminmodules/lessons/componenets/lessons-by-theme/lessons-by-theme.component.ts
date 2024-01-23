import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Lesson } from '../../Lesson';
import { LessonService } from '../../services/lesson.service';
import { AddNewLessonAndAffectToThemeComponent } from '../add-new-lesson-and-affect-to-theme/add-new-lesson-and-affect-to-theme.component';
import { MenuService } from '../../../users/services/MenuService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpEventType, HttpResponse } from '@angular/common/http';
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

  downloadProgress = 0;

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
      header: 'إضافة مقطع فيديو جديد لهذا الدرس',
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
      header: 'تغير بيانات مقطع فيديو',
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
        message: 'هل تريد فعلاً حذف هذا المقطع؟',
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
                            summary: ' تم حذف المقطع  بنجاح ',
                            detail: 'تم حذف المقطع  بنجاح ',
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
                summary: 'لم يتم حذف المقطع ',
                detail: 'لم يتم حذف المقطع ',
                life: 3000
            });
        }
    });
}

closeModalAndNotify() {

  this.menu.triggerNewItemAdded();
}


// In your Angular component
extractFileName(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}


  
}
