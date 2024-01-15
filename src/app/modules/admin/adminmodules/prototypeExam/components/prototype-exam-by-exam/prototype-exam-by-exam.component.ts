import { Component } from '@angular/core';
import { PrototypeExamService } from '../../services/prototype-exam.service';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PrototypeExam } from '../../models/PrototypeExam';
import { HttpResponse } from '@angular/common/http';
import { EditPrototypeExamByIdComponent } from '../edit-prototype-exam-by-id/edit-prototype-exam-by-id.component';
import { MenuService } from '../../../users/services/MenuService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddPrototypeExamComponent } from '../add-prototype-exam/add-prototype-exam.component';

@Component({
  selector: 'app-prototype-exam-by-exam',
  templateUrl: './prototype-exam-by-exam.component.html',
  styleUrls: ['./prototype-exam-by-exam.component.css']
})
export class PrototypeExamByExamComponent {
  matiereId:any
  examenId:any
  ExamenNom:any
  PrototypeExamList : PrototypeExam[]=[]
  showConfirmationDialogPrototypeExam:boolean = false;
constructor(private prototypeExamService: PrototypeExamService,
  public config: DynamicDialogConfig,
  private dialogService:DialogService,private menu:MenuService,private messageService:MessageService
  ,private confirmationService:ConfirmationService
  ){
    this.matiereId = this.config.data.matiereid
    this.examenId = this.config.data.examenId
    this.ExamenNom = this.config.data.ExamenNom



  }

ngOnInit(): void {
  // Call the service method to get prototype exams by examen ID
  this.getPrototypeExamsByExamenId(); // Replace with the actual examen ID
  this.menu.newItemAdded$.subscribe(() => {
    this.getPrototypeExamsByExamenId(); // Replace with the actual examen ID
  });
}

getPrototypeExamsByExamenId() {
  this.prototypeExamService.getPrototypeExamsByExamenId(this.examenId).subscribe(
    prototypeExams => {

      this.PrototypeExamList = prototypeExams

    },
    error => {
      console.error('Error fetching prototype exams:', error);
    }
  );
}


downloadPrototypeExamCorrectionFile( prototypeExamId: number,nomPrototypeExam:string) {
  this.prototypeExamService.downloadprototypeExamcorrectionFile(this.examenId, prototypeExamId).subscribe(
    (response: HttpResponse<ArrayBuffer>) => {
      if (response.body !== null) {
        this.handleDownload(response,this.ExamenNom + " "+nomPrototypeExam);
      } else {
        console.error('Response body is null.');
      }
    },
    (error: any) => {
      console.error('Download failed:', error);
    }
  );
}


downloadExamFile( prototypeExamId: number,nomPrototypeExam:string) {
  this.prototypeExamService.downloadprototypeExamFile(this.examenId, prototypeExamId).subscribe(
    (response: HttpResponse<ArrayBuffer>) => {
      if (response.body !== null) {
        this.handleDownload(response,this.ExamenNom + " "+nomPrototypeExam);
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



public OpenPrototypeExamById(prototypeExamId:number): void {
  this.dialogService.open(EditPrototypeExamByIdComponent, {
   header: 'تعديل بيانات نموذج الفرض',
   width: '50%',
   height: '90%',
   dismissableMask:true,
   data: {
     prototypeExamId:prototypeExamId,
     ExamenNom:this.ExamenNom
   },
 });

}



public OpenAddPrototypeExam(): void {
  this.dialogService.open(AddPrototypeExamComponent, {
   header: 'إضافة نموذج جديد',
   width: '50%',
   height: '90%',
   dismissableMask:true,
   data: {
    examenId:this.examenId
   },
 });

}

public deletePrototypeExamsById(event: Event, prototypeExamId: number) {
  this.showConfirmationDialogPrototypeExam = true;
  this.confirmationService.confirm({
    target: event.target as EventTarget,
    acceptLabel: 'نعم',
    rejectLabel: 'لا',
    message: 'هل أنت متأكد أنك تريد حذف هذا النموذج؟',
    accept: () => {
      this.prototypeExamService.deletePrototypeExamsById(prototypeExamId).subscribe(
        (data: any) => {
          if (data.successmessage === 'PrototypeExam deleted successfully') {
            this.messageService.add({
              severity: 'success',
              summary: 'تم الحذف بنجاح',
              detail: 'تم الحذف بنجاح'
            });
            this.menu.triggerNewItemAdded();
          } else if (data.errormessage) {
            this.messageService.add({
              severity: 'error',
              summary: 'لم يتم الحذف',
              detail: 'لم يتم الحذف'
            });
          }
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'لم يتم الحذف',
            detail: 'لم يتم الحذف'
          });
      }
      );
    },
    reject: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'لم يتم الحذف',
        detail: 'لم يتم الحذف'
      });
}
  });
}


}
