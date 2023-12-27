import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExamenService } from '../../service/examen.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../users/services/MenuService';

@Component({
  selector: 'app-add-examen-and-affect-to-matiere',
  templateUrl: './add-examen-and-affect-to-matiere.component.html',
  styleUrls: ['./add-examen-and-affect-to-matiere.component.css']
})
export class AddExamenAndAffectToMatiereComponent implements OnInit {

  correctionFile: File;
  pieceJointes : File[]


  matiereId :number;
  ExamenForm:FormGroup

  constructor(public config: DynamicDialogConfig,
    private examenService:ExamenService,
    private fb:FormBuilder,
    public ref: DynamicDialogRef,
    private menu:MenuService
    ){



  }


  ngOnInit(): void {

    this.matiereId = this.config.data.matiereid

    this.ExamenForm = this.fb.group({
      nomExamen : ['',Validators.required],
      videoLien :['',Validators.required],
    })
    
  }



  onFileSelectedCorrectionFile(event: any) {
    const file: File = event.target.files[0];
  
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.correctionFile = file;
    };
  
    reader.readAsDataURL(file);
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
  
  




  OnSubmit(){

    this.examenService.createExamenAndAffectToMatiere(this.matiereId,
      this.ExamenForm.value.nomExamen,
      this.ExamenForm.value.videoLien,
      this.correctionFile,this.pieceJointes      
      ).subscribe(

        (data)=>{

 this.closeModalAndNotify()

        }

      )

  }

  closeModalAndNotify() {
    this.ref.close();

    this.menu.triggerNewItemAdded();
  }


}
