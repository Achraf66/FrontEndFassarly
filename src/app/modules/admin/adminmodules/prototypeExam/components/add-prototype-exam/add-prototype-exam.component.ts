import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrototypeExamService } from '../../services/prototype-exam.service';
import { MessageService } from 'primeng/api';
import { MenuService } from '../../../users/services/MenuService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrototypeExam } from '../../models/PrototypeExam';

@Component({
  selector: 'app-add-prototype-exam',
  templateUrl: './add-prototype-exam.component.html',
  styleUrls: ['./add-prototype-exam.component.css']
})
export class AddPrototypeExamComponent implements OnInit{
  
  prototypeExamFile:any
  correctionFile: any;
  prototypeExam: PrototypeExam;
  AddPrototypeExamForm: FormGroup;
  examenId

  constructor(
    public config: DynamicDialogConfig,
    private prototypeExamService: PrototypeExamService,
    private fb: FormBuilder,public ref: DynamicDialogRef,
    private menu:MenuService,private messageService:MessageService
  ) {
    this.examenId = this.config.data.examenId
  }

  ngOnInit(): void {
    this.initializeForm();

}




  initializeForm() {
    this.AddPrototypeExamForm = this.fb.group({
        nomPrototypeExam: ["",Validators.required],
        correctionLink: [""],
    });
}


  onSubmit() {

    if (this.AddPrototypeExamForm.valid) {
      this.prototypeExamService.createAndAffectPrototypeExamToExamen
      ( this.AddPrototypeExamForm.value.nomPrototypeExam,
        this.prototypeExamFile,
        this.correctionFile,
        this.AddPrototypeExamForm.value.correctionLink,
        this.examenId
        )
 
        
        
        .subscribe(
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

  closeModalAndNotify() {

    this.menu.triggerNewItemAdded()
    this.ref.close();

  }










}
