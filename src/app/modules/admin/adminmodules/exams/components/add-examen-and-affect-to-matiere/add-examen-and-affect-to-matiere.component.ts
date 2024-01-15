import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExamenService } from '../../service/examen.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../users/services/MenuService';
import {MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-examen-and-affect-to-matiere',
  templateUrl: './add-examen-and-affect-to-matiere.component.html',
  styleUrls: ['./add-examen-and-affect-to-matiere.component.css']
})
export class AddExamenAndAffectToMatiereComponent implements OnInit {

  correctionFile: File;
  pieceJointes : File[]
  isAddExamen = true;

  matiereId :number;
  ExamenForm:FormGroup

  constructor(public config: DynamicDialogConfig,
    private examenService:ExamenService,
    private fb:FormBuilder,
    public ref: DynamicDialogRef,
    private menu:MenuService,
    private messageService:MessageService
    ){



  }


  ngOnInit(): void {

    this.matiereId = this.config.data.matiereid

    this.ExamenForm = this.fb.group({
      nomExamen : ['',Validators.required]
        })
    
  }






  OnSubmit() {
    this.examenService.createExamenAndAffectToMatiere(
      this.matiereId,
      this.ExamenForm.value.nomExamen
          ).subscribe(
      (data) => {
        this.closeModalAndNotify();
      },
      (error) => {
        console.error('Error occurred during exam creation:', error);
  
        // Check if the error message contains a hint about the file size exceeded
        const errorMessage = error?.error?.message || 'Something went wrong during exam creation.';
  
        // Display the error message in Arabic using PrimeNG's MessageService
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: errorMessage,
        });
      }
    );
  }
  
  
  

  closeModalAndNotify() {
    this.ref.close();

    this.menu.triggerNewItemAdded();
  }


}
