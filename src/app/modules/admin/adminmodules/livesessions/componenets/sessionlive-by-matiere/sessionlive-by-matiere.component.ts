import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MatiereService } from 'src/app/modules/matieres/services/matiere.service';
import { LivesessionService } from '../../services/livesession.service';
import { SeanceEnLigne } from '../../models/SeanceEnLigne';
import { DOCUMENT, DatePipe } from '@angular/common';
import { AddnewSessionLiveComponent } from '../addnew-session-live/addnew-session-live.component';
import { EditSessionsComponent } from '../edit-sessions/edit-sessions.component';
import { MenuService } from '../../../users/services/MenuService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-sessionlive-by-matiere',
  templateUrl: './sessionlive-by-matiere.component.html',
  styleUrls: ['./sessionlive-by-matiere.component.css']
})
export class SessionliveByMatiereComponent {

  matiereid
  seanceEnLignes:SeanceEnLigne[] =[]

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, 
    private fb: FormBuilder,
    private dialogService:DialogService,
    private liveSesssions : LivesessionService,
    @Inject(DOCUMENT) public document: Document,
    @Inject(LOCALE_ID) public locale: string,
    private menu: MenuService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService
  
  ) {

    
    this.matiereid = this.config.data.matiereid;
    this.fetchSessionLiveByMatiere();

    this.menu.newItemAdded$.subscribe(() => {
      this.fetchSessionLiveByMatiere()
    });

  }


  fetchSessionLiveByMatiere(){
    this.liveSesssions.getSessionLiveByMatiereId(this.matiereid).subscribe(
        (data)=>{
          this.seanceEnLignes = data
        },
        (error)=>console.log(error)
    )        
  }


  public OpenAddSessionLive(): void {
    this.dialogService.open(AddnewSessionLiveComponent, {
     header: 'إضافة حصة مباشرة',
     width: '40%',
     height: '90%',
     dismissableMask:true,
     data: {
      matiereid:this.matiereid
     },
   });


}



public OpenEditessionLive(sessionid:number): void {
  this.dialogService.open(EditSessionsComponent, {
   header: 'تعديل بيانات الحصة المباشرة',
   width: '40%',
   height: '90%',
   dismissableMask:true,
   data: {
    matiereid:this.matiereid,
    sessionid:sessionid
   },
 });


}

deleteSeanceEnLigneById(SeanceEnLigneId: number): void {
  this.confirmationService.confirm({
    message: 'هل تريد فعلاً حذف هذه الجلسة عبر الإنترنت؟',
    header: 'تأكيد الحذف',
    icon: 'pi pi-exclamation-triangle',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    acceptLabel: 'نعم',
    rejectLabel: 'لا',
    acceptButtonStyleClass: 'p-button-success',
    rejectButtonStyleClass: 'p-button-danger',
    accept: () => {
      this.liveSesssions.deleteSeanceEnLigneById(SeanceEnLigneId).subscribe(
        (data: any) => {
          if (data.message === 'SeanceEnLigne supprimée avec succès') {
            this.messageService.add({
              severity: 'success',
              summary: ' تم حذف الجلسة عبر الإنترنت بنجاح ',
              detail: 'تم حذف الجلسة عبر الإنترنت بنجاح ',
              life: 3000
            });
            this.closeModalAndNotify();
          }
        },
        (error) => {
          // Handle error, if needed
        }
      );
    },
    reject: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'لم يتم حذف الجلسة عبر الإنترنت',
        detail: 'لم يتم حذف الجلسة عبر الإنترنت',
        life: 3000
      });
    }
  });
}

closeModalAndNotify() {
  this.ref.close()
  this.menu.triggerNewItemAdded();
}
}
