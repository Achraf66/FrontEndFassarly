import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../users/services/MenuService';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExamenService } from '../../service/examen.service';
import { Examen } from '../../Examen';
import { AddExamenAndAffectToMatiereComponent } from '../add-examen-and-affect-to-matiere/add-examen-and-affect-to-matiere.component';
import { HttpResponse } from '@angular/common/http';
import { EditExamenMatiereComponent } from '../edit-examen-matiere/edit-examen-matiere.component';
import { ConfirmationService, MessageService } from 'primeng/api';

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
      private messageService: MessageService,
      public config: DynamicDialogConfig,
      private examenService:ExamenService,
      private dialogService:DialogService,
      private confirmationService:ConfirmationService
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
  
  downloadPiecesJointes(matiereId:number ,examenId:number) {

    this.examenService.downloadPiecesJointes(matiereId, examenId)
      .subscribe(blob => {
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);

        downloadLink.href = url;
        downloadLink.download = 'pieces_jointes.zip';

        document.body.appendChild(downloadLink);
        downloadLink.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);
      });
  }


  public OpenEditExamenMatiereComponent(examenId:number,ExamenNom:string): void {
    this.dialogService.open(EditExamenMatiereComponent, {
     header: 'تعديل بيانات الفرض',
     width: '50%',
     height: '90%',
     dismissableMask:true,
     data: {
       matiereid:this.matiereId,
       examenId:examenId,
       ExamenNom:ExamenNom
     },
   });
  
  }

  deleteExamenAndFolderById(ExamenId:number){
    this.examenService.deleteExamenAndFolderById(ExamenId).subscribe(

    (data:any)=>{
      if(data.message === 'Examen supprimé avec succès'){
        this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم الحذف بنجاح' });
        this.GetExamensMatiere(this.matiereId);
      }

    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'خطا', detail: 'خطا' });
    }

    )
  }



  deleteExam(event: Event,ExamenId:number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'هل تريد فعلاً حذف ',
        header: 'هل تريد فعلاً حذف',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        acceptLabel: 'نعم',
        rejectLabel: 'لا',
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
         
          this.deleteExamenAndFolderById(ExamenId)

        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'لم يتم حذف ', detail: 'لم يتم حذف ', life: 3000 });
        }
    });
}
  

}
