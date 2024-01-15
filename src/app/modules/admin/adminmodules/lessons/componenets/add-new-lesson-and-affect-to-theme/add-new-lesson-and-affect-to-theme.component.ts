import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../Lesson';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../users/services/MenuService';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-new-lesson-and-affect-to-theme',
  templateUrl: './add-new-lesson-and-affect-to-theme.component.html',
  styleUrls: ['./add-new-lesson-and-affect-to-theme.component.css']
})
export class AddNewLessonAndAffectToThemeComponent implements OnInit{

  Lesson:Lesson
  ThemeId
  nomTheme
  LessonForm : FormGroup
  pieceJointes:File[]

  constructor(private lessonService:LessonService,
    public config: DynamicDialogConfig,
    private fb:FormBuilder,
    private ref:DynamicDialogRef,
    private menu: MenuService,
    private messageService:MessageService
    ){

    this.ThemeId = this.config.data.ThemeId
    this.nomTheme = this.config.data.nomTheme


    // this.fetchLessonById(this.LessonId)

  }


  ngOnInit(): void {
    this.LessonForm = this.fb.group({
      nomLesson : ['',Validators.required],
      videoLien:[''],
      description:['']
    })


  }

  onFilesSelectedPieceJointes(event: any) {
    const files: FileList = event.target.files;
    this.pieceJointes = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.pieceJointes.push(file);
      };
  
      reader.readAsDataURL(file);
    }
  }



  // fetchLessonById(LessonId:number){
  //   this.lessonService.fetchLessonById(LessonId).subscribe(
  //     (data)=>{
  //     this.Lesson = data
  //   },(error)=>{
  //     console.log(error)
  //   })
  // }


  OnSubmit(){

    this.lessonService.createLessonAndAffectToTheme(this.ThemeId,
      this.LessonForm.value.nomLesson,
      this.LessonForm.value.videoLien,
      this.LessonForm.value.description,
      this.pieceJointes      
      ).subscribe(

        (data:any)=>{
        
            this.closeModalAndNotify()
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم إضافة المقطع فيديو بنجاح' });    
          
        

        },(error)=>
        
        {

          this.messageService.add({ severity: 'error', summary: ' لم يتم إضافة المقطع فيديو ', detail: ' لم يتم إضافة المقطع فيديو ' });    

        }

      )

  }

  closeModalAndNotify() {
    this.ref.close();

    this.menu.triggerNewItemAdded();
  }

}
