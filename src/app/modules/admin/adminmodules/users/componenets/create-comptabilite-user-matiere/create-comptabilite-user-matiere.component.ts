import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatiereService } from '../../../matieres/services/matiere.service';
import { Matiere } from '../../../matieres/Models/Matiere';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { MenuService } from '../../services/MenuService';

@Component({
  selector: 'app-create-comptabilite-user-matiere',
  templateUrl: './create-comptabilite-user-matiere.component.html',
  styleUrls: ['./create-comptabilite-user-matiere.component.css']
})
export class CreateComptabiliteUserMatiereComponent implements OnInit{

 
    userId:number = 0;

    ComptabliteForm:FormGroup

    MatiereList:Matiere[]=[]

    constructor(private userService:UsersService,
      private matiereService:MatiereService,
      private fb:FormBuilder,
      public config: DynamicDialogConfig,private messageService:MessageService,
      private menu:MenuService,private dialogService:DialogService,
      public ref: DynamicDialogRef

      ){

          this.userId = this.config.data?.userId;
    }


  ngOnInit(): void {


    this.ComptabliteForm = this.fb.group({

        paye: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
        nonPaye: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
        idMatiere: [this.MatiereList.length > 0 ? this.MatiereList[0].id : null],
        idUser:[this.userId]
    })


    this.fetchMatieres();

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


      }

  )


      }
    

  OnSubmit(){

    this.userService.createAndAffectComtabliteToUser(this.ComptabliteForm.value.paye,this.ComptabliteForm.value.nonPaye,this.ComptabliteForm.value.idMatiere.id,this.ComptabliteForm.value.idUser).subscribe(

      (data: any) => {
        if (data.message === 'matiere already Exists for this User') {


          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'المادة موجودة بالفعل لهذا المستخدم' });
          
          
        } else if (data.message === 'matiere Created and affected to the user') {

          this.menu.triggerNewItemAdded();

          this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم اشتراك المستخدم بنجاح في هذه المادة' });

          this.closeModalAndNotify() 

        } else {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ غير معروف' });

        }
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ غير معروف' });
      }

    )
  }



  closeModalAndNotify() {
    this.ref.close();

  }


 
}
