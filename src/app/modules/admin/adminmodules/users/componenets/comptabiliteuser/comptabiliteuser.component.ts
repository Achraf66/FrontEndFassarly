import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Comptabilite } from '../../models/Comptabilite';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateComptabiliteUserMatiereComponent } from '../create-comptabilite-user-matiere/create-comptabilite-user-matiere.component';
import { MessageService, SortEvent } from 'primeng/api';
import { MenuService } from '../../services/MenuService';
import { ModifyMatiereComponent } from '../../../matieres/components/modify-matiere/modify-matiere.component';
import { ComptabiliteModifyComponent } from '../comptabilite-modify/comptabilite-modify.component';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-comptabiliteuser',
  templateUrl: './comptabiliteuser.component.html',
  styleUrls: ['./comptabiliteuser.component.css']
})
export class ComptabiliteuserComponent implements OnInit {
  globalFilterValue: string = '';

  comptabilites:Comptabilite[]=[];
  idUser:any;
  nomPrenom:any
  numtel:any
  cols: any[];
  constructor(private userservice:UsersService,public config: DynamicDialogConfig,public ref: DynamicDialogRef,
    private dialogService:DialogService,private messageService:MessageService,private menu:MenuService
    ){

    this.idUser = this.config.data.idUser;
    this.nomPrenom = this.config.data.nomPrenom
    this.numtel = this.config.data.numtel
    
  }

  ngOnInit(): void {

    this.menu.newItemAdded$.subscribe(() => {
      this.fetchComtablites(this.idUser)
    });

    
    this.cols = [
      { field: 'المادة', header: 'المادة',title:'matieres.id',sortable: true },
      { field: 'المبلغ المدفوع', header: 'المبلغ المدفوع',title:'paye', sortable: true},
      { field: 'المبلغ المتبقي', header: 'المبلغ المتبقي',title:'nonPaye',sortable: true},
      { field: 'اجراء تعديل على البيانات', header: 'اجراء تعديل على البيانات',sortable: false },
      { field: 'إلغاء إشتراك هذا المستخدم فالمادة', header: 'إلغاء إشتراك هذا المستخدم فالمادة',sortable: false },

  ];



  
 this.fetchComtablites(this.idUser)



}

fetchComtablites(idUserr:string){

  this.userservice.getComptabiliteByUserId(idUserr).subscribe(
    (data)=> {
     this.comptabilites = data;
     
   });

}

openModalAddComptabilite(userId:number): void {
  this.dialogService.open(CreateComptabiliteUserMatiereComponent, {
     header: 'إضافة إشتراك في مادة', 
     width: '50%',
     height:'90%',
     dismissableMask: true  ,
     data: {
      userId: userId
    } 
   });
 }

 openModalModifyComponent(comptabiliteId:number): void {
  this.dialogService.open(ComptabiliteModifyComponent, {
     header: 'تعديل بيانات الإشتراك', 
     width: '70%',
     height:'100%',
     dismissableMask: true  ,
   
     data: {
    comptabiliteId: comptabiliteId,
    userId : this.idUser
   }

  });
 }

 deleteComptabiliteById(comptabiliteId:number){

  this.userservice.deleteComptabiliteById(comptabiliteId).subscribe(

    (data:any)=>{

      if(data.message === 'Comptabilite supprimée avec succès'){

        this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم إلغاء إشتراك هذا المستخدم  في هذه المادة' });
        this.fetchComtablites(this.idUser)


      }
      if (data.error === 'Une erreur s\'est produite.') {

        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ غير معروف' });


    }

  }






  )
 }



 clear(table: Table) {
  table.clear();
}


}
