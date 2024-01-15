import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../users/services/MenuService';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ExamenService } from '../../service/examen.service';
import { Examen } from '../../Examen';
import { AddExamenAndAffectToMatiereComponent } from '../add-examen-and-affect-to-matiere/add-examen-and-affect-to-matiere.component';
import { EditExamenMatiereComponent } from '../edit-examen-matiere/edit-examen-matiere.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrototypeExamByExamComponent } from '../../../prototypeExam/components/prototype-exam-by-exam/prototype-exam-by-exam.component';

@Component({
  selector: 'app-examen-matiere',
  templateUrl: './examen-matiere.component.html',
  styleUrls: ['./examen-matiere.component.css']
})
export class ExamenMatiereComponent implements OnInit{

  matiereId:number
  searchTerm:string = ''
  ExamenList :Examen[]=[]
  showConfirmationDialogExamen :boolean = false


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
  SearchExamByNom(searchTerm:string){
    this.examenService.searchExamens(searchTerm).subscribe(
      data => this.ExamenList = data,
      error => console.error('Error searching examens:', error)
    )
  }


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
    this.showConfirmationDialogExamen = true
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
    this.showConfirmationDialogExamen = true
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



public OpenPrototypeExamByExamId(examenId:number,ExamenNom:string): void {
  this.dialogService.open(PrototypeExamByExamComponent, {
   header: 'نماذج الفرض',
   width: '80%',
   height: '90%',
   dismissableMask:true,
   data: {
     matiereid:this.matiereId,
     examenId:examenId,
     ExamenNom:ExamenNom
   },
 });

}

  

}
