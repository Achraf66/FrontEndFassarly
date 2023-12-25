import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComptabiliteService } from '../../../comptabilites/services/comptabilite.service';
import { Comptabilite } from '../../models/Comptabilite';
import { Matiere } from '../../../matieres/Models/Matiere';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatiereService } from 'src/app/modules/matieres/services/matiere.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { MenuService } from '../../services/MenuService';

@Component({
  selector: 'app-comptabilite-modify',
  templateUrl: './comptabilite-modify.component.html',
  styleUrls: ['./comptabilite-modify.component.css']
})
export class ComptabiliteModifyComponent implements OnInit{

comptabiliteId:number
userId:number
comptablite:Comptabilite;


ComptabliteForm:FormGroup

MatiereList:Matiere[]=[]

selecteMatiereValue:any


 constructor(public config: DynamicDialogConfig 
  , private comptabliteService:ComptabiliteService
  ,private  fb: FormBuilder
  ,private matiereService:MatiereService
  ,private messageService :MessageService
  ,private menu:MenuService
  ,public ref: DynamicDialogRef

  ){


  this.comptabiliteId = this.config.data.comptabiliteId;
  this.userId = this.config.data.userId;
  this.initializeForm(); 

 }




  ngOnInit(): void {
    this.fetchMatieres();

    this.fetchComptabiliteById(this.comptabiliteId)



  }


  fetchMatieres(){
    return this.matiereService.getAllMatieres().subscribe(
  (data)=> {
    this.MatiereList = data
    },
    (error)=>{
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Something went wrong!",
        showCloseButton:true
      });
    })}
  
    fetchComptabiliteById(comptabiliteId: number) {
      this.comptabliteService.GetComptabiliteById(comptabiliteId).subscribe(
        (data: Comptabilite) => {
          this.comptablite = data;
          this.initializeForm();
        }
      );
    }

    initializeForm() {
      // Determine the preselected matiere based on some condition
      const preselectedMatiere = this.MatiereList.find(matiere => matiere.id == this.comptablite.matieres.id);
    
      // Set the default value for idMatiere
      const defaultMatiereId = preselectedMatiere ? preselectedMatiere.id : null;
    
      this.ComptabliteForm = this.fb.group({
        paye: [this.comptablite?.paye, [Validators.required, Validators.pattern('^[0-9]+$')]],
        nonPaye: [this.comptablite?.nonPaye, [Validators.required, Validators.pattern('^[0-9]+$')]],
        idMatiere: [defaultMatiereId, Validators.required],
        idUser: [this.userId]
      });
    }
    
    


  findMatiereId(selectedMatiereId: number): number | null {
    const matiere = this.MatiereList.find(m => m.id === selectedMatiereId);
    return matiere ? matiere.id : null;
  }

  OnSubmit(){

    this.comptabliteService.
    editComptabilite(this.comptabiliteId,this.ComptabliteForm.value.paye,this.ComptabliteForm.value.nonPaye,this.ComptabliteForm.value.idMatiere).subscribe(

      (data: any) => {

        if (data.message === 'Comptabilite not found') {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'لم يتم العثور على السجل المحدد' });
        } else if (data.message === 'Comptabilite Updated') {
          this.closeModalAndNotify()
          this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم تحديث السجل بنجاح' });
        }  else if (data.message === 'Matiere is already associated with this user') {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'المادة موجودة بالفعل لهذا المستخدم' });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ غير متوقع' });
        }
      },(error)=>{
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ غير متوقع' });

      }
      )
  }

  closeModalAndNotify() {
    this.menu.triggerNewItemAdded();

    this.ref.close();

  }
}
