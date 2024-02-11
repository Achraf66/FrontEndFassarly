import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../users/services/MenuService';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExamenService } from '../../service/examen.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Examen } from '../../Examen';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-examen-matiere',
  templateUrl: './edit-examen-matiere.component.html',
  styleUrls: ['./edit-examen-matiere.component.css']
})
export class EditExamenMatiereComponent implements OnInit {

  matiereId: number;
  examenId: number;
  ExamenNom: string;
  ExamenForm: FormGroup;
  Examen: Examen;
  correctionFile:File;
  pieceJointes:File[]
  constructor(
    private menu: MenuService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private examenService: ExamenService,
    private messageService: MessageService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.matiereId = this.config.data.matiereid;
    this.examenId = this.config.data.examenId;
    this.ExamenNom = this.config.data.ExamenNom;

    this.fetchExamenById(this.examenId);
    this.createForm();
  }


  

  
 
  OnSubmit() {
    const { nomExamen, videoLien,order } = this.ExamenForm.value;

    this.examenService.editExamen(
      this.examenId,
      nomExamen,
      order
            ).subscribe(
      (updatedExamen) => {
        this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم تعديل هذا الفرض بنجاح' });
        this.closeModalAndNotify();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'خطا', detail: 'خطا' });
      }
    );
  }

  fetchExamenById(examenId: number) {
    this.examenService.fetchExamenById(examenId).subscribe(
      (data: Examen) => {
        this.Examen = data;
        this.createForm();
      },
      (error) => console.log(error)
    );
  }

  private createForm(): void {
    this.ExamenForm = this.fb.group({
      nomExamen: [this.Examen ? this.Examen.nomExamen : '', Validators.required],
      order: [this.Examen ? this.Examen.order : '', Validators.required]

        });
  }

  private closeModalAndNotify() {
    this.ref.close();
    this.menu.triggerNewItemAdded();
  }
}

