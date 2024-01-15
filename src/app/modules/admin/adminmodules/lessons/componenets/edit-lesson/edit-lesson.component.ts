import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LessonService } from '../../services/lesson.service';
import { MenuService } from '../../../users/services/MenuService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lesson } from '../../Lesson';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {
  ThemeId;
  nomTheme;
  LessonId: any;
  pieceJointes: File[];
  lesson: Lesson;
  EditLessonForm: FormGroup;

  constructor(
    public config: DynamicDialogConfig,
    private lessonService: LessonService,
    private dialogService: DialogService,
    private menu: MenuService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ref:DynamicDialogRef,
    private fb: FormBuilder
  ) {
    this.ThemeId = this.config.data.ThemeId;
    this.nomTheme = this.config.data.nomTheme;
    this.LessonId = this.config.data.LessonId;

    this.fetchLessonById(this.LessonId);
  }

  ngOnInit(): void {
    // Move the form initialization logic here
    this.EditLessonForm = this.fb.group({
      nomLesson: [this.lesson?.nomLesson, Validators.required],
      videoLien: [this.lesson?.videoLien],
      description: [this.lesson?.description],
    });
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

  

  fetchLessonById(LessonId: number) {
    this.lessonService.fetchLessonById(LessonId).subscribe(
      (data) => {
        this.lesson = data;
        // You might want to call the form initialization logic here as well
        this.initializeForm();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private initializeForm() {
    // Check if the lesson is defined before initializing the form
    if (this.lesson) {
      this.EditLessonForm = this.fb.group({
        nomLesson: [this.lesson.nomLesson, Validators.required],
        videoLien: [this.lesson.videoLien],
        description: [this.lesson.description],
      });
    }
  }

  OnSubmit() {
this.lessonService.updateLesson
  (
  this.LessonId,this.EditLessonForm.value.nomLesson
  ,this.EditLessonForm.value.videoLien ,this.EditLessonForm.value.description,this.pieceJointes
  ).subscribe(
    ()=>{

      this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم تغير بيانات الدرس بنجاح' });    

      this.closeModalAndNotify()
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: ' لم يتم تغير بيانات الدرس بنجاح ', detail: ' لم يتم تغير بيانات الدرس بنجاح ' });    

    }
  )
  }

  closeModalAndNotify() {
    this.ref.close();

    this.menu.triggerNewItemAdded();
  }
}

