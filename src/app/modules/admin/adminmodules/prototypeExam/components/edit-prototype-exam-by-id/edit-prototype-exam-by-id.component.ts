import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrototypeExamService } from '../../services/prototype-exam.service';
import { PrototypeExam } from '../../models/PrototypeExam';
import { Observable, catchError, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../users/services/MenuService';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-prototype-exam-by-id',
  templateUrl: './edit-prototype-exam-by-id.component.html',
  styleUrls: ['./edit-prototype-exam-by-id.component.css']
})
export class EditPrototypeExamByIdComponent implements OnInit {
  prototypeExamId;
  prototypeExamFile:any
  correctionFile: any;
  prototypeExam: PrototypeExam;
  EditPrototypeExamForm: FormGroup;
  ExamenNom
  constructor(
    public config: DynamicDialogConfig,
    private prototypeExamService: PrototypeExamService,
    private fb: FormBuilder,public ref: DynamicDialogRef,
    private menu:MenuService,private messageService:MessageService
  ) {
    this.prototypeExamId = this.config.data.prototypeExamId;
    this.ExamenNom = this.config.data.ExamenNom;

  }

  ngOnInit(): void {
    this.fetchPrototypeExamById().subscribe(
        (data) => {
            this.initializeForm();
        },
        (error) => {
            console.error(error);
        }
    );
}


  fetchPrototypeExamById(): Observable<PrototypeExam> {
    return this.prototypeExamService.getPrototypeExamsById(this.prototypeExamId).pipe(
      tap((data) => {
        this.prototypeExam = data;
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  initializeForm() {
    this.EditPrototypeExamForm = this.fb.group({
        nomPrototypeExam: [this.prototypeExam?.nomPrototypeExam,Validators.required],
        examFile: [this.prototypeExam?.examFile],
        correctionFile: [this.prototypeExam?.correctionFile],
        correctionLink: [this.prototypeExam?.correctionLink],
        
    });
}


  onSubmit() {

    if (this.EditPrototypeExamForm.valid) {
      this.prototypeExamService.editPrototypeExam
      ( this.prototypeExamId,
        this.EditPrototypeExamForm.value.nomPrototypeExam,
        this.prototypeExamFile,
        this.correctionFile,
        this.EditPrototypeExamForm.value.correctionLink
        ).subscribe(
        (data) => {
          this.messageService.add({ severity: 'success', summary: 'تم التغيير بنجاح', detail: 'تم التغيير بنجاح' });
          this.closeModalAndNotify();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'لم يتم التغيير', detail: 'لم يتم التغيير' });

        }
      );
    }
  }

  onFileSelectedCorrectionFile(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.correctionFile = file;
    };
    reader.readAsDataURL(file);
  }

  onFileSelectedPrototypeExamFile(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Correctly assign the selected prototype exam file
      this.prototypeExamFile = file;
    };
    reader.readAsDataURL(file);
  }

  setprototypeExamFilenull()
  {
    this.prototypeExamFile = null;
  }

  closeModalAndNotify() {

    this.menu.triggerNewItemAdded()
    this.ref.close();

  }
}

