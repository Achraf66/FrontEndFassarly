import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../users/services/MenuService';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExamenService } from '../../service/examen.service';
import { Examen } from '../../Examen';

@Component({
  selector: 'app-examen-matiere',
  templateUrl: './examen-matiere.component.html',
  styleUrls: ['./examen-matiere.component.css']
})
export class ExamenMatiereComponent implements OnInit{

  matiereId:number

  ExamenList :Examen[]=[]

  constructor(  
      private menu:MenuService,
      private ref: DynamicDialogRef,
      public config: DynamicDialogConfig,
      private examenService:ExamenService
) {

  }

  ngOnInit(): void {

    this.matiereId = this.config.data.matiereid
    this.GetExamensMatiere(this.matiereId);

  }

  GetExamensMatiere(matiereId:number){

    this.examenService.GetExamensMatiere(matiereId).subscribe(
      (data) => {
        console.log('Response:', data);
        this.ExamenList=data

      },
      (error) => {
        console.error('Error:', error);
        // Handle error
      }
    );
    
    
  
  }

}
