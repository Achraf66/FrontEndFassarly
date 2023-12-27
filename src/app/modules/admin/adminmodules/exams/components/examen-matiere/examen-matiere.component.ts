import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../users/services/MenuService';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExamenService } from '../../service/examen.service';
import { Examen } from '../../Examen';
import { AddExamenAndAffectToMatiereComponent } from '../add-examen-and-affect-to-matiere/add-examen-and-affect-to-matiere.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-examen-matiere',
  templateUrl: './examen-matiere.component.html',
  styleUrls: ['./examen-matiere.component.css']
})
export class ExamenMatiereComponent implements OnInit{

  matiereId:number

  ExamenList :Examen[]=[]

  expandText = false;
  displayText = 'This is the full text that will be displayed when clicked';
  truncatedText = this.displayText.slice(0, 20); 


  constructor(  
      private menu:MenuService,
      private ref: DynamicDialogRef,
      public config: DynamicDialogConfig,
      private examenService:ExamenService,
      private dialogService:DialogService
) {

  }

  ngOnInit(): void {

    this.matiereId = this.config.data.matiereid
    this.GetExamensMatiere(this.matiereId);

    this.menu.newItemAdded$.subscribe(() => {
      this.GetExamensMatiere(this.matiereId)
    });

  }

  GetExamensMatiere(matiereId:number){

    this.examenService.GetExamensMatiere(matiereId).subscribe(
      (data) => {
        this.ExamenList=data

      },
      (error) => {
      }
    );
    
    
  
  }
  downloadpdf() {}


  public OpenCreateExamenAndAffectToMatiereComponent(): void {
    this.dialogService.open(AddExamenAndAffectToMatiereComponent, {
     header: 'إضافة فرض جديد',
     width: '50%',
     height: '90%',
     dismissableMask:true,
     data: {
       matiereid:this.matiereId
     },
   });
  
  }

  downloadCorrection(matiereId: number, examenId: number,examenname:string) {
    this.examenService.downloadCorrectionFile(matiereId, examenId).subscribe(
      (response: HttpResponse<ArrayBuffer>) => {
        if (response.body !== null) {
          this.handleDownload(response,examenname);
        } else {
          console.error('Response body is null.');
        }
      },
      (error: any) => {
        console.error('Download failed:', error);
      }
    );
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
  
  
  
  

}
