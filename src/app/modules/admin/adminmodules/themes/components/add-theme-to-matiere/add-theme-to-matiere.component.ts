import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ThemeService } from '../../services/theme.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenuService } from '../../../users/services/MenuService';
import { Theme } from '../../models/Theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-theme-to-matiere',
  templateUrl: './add-theme-to-matiere.component.html',
  styleUrls: ['./add-theme-to-matiere.component.css']
})
export class AddThemeToMatiereComponent implements OnInit {


  Theme:Theme
  ThemeForm:FormGroup
  matiereId:number
  constructor(
    private dialogService:DialogService,
    private ref:DynamicDialogRef,
    public config: DynamicDialogConfig,
    private themeservice:ThemeService,
    private confirmationService: ConfirmationService,
    private messageService:MessageService,
    private menu:MenuService,
    private fb:FormBuilder

    ) {

      this.matiereId = this.config.data.matiereId

     }

    ngOnInit(): void {
      
      this.ThemeForm = this.fb.group({
        nomTheme: ['',Validators.required]

      })
    }



    onSubmit(){

      console.log(this.ThemeForm.value)

      this.themeservice.addThemeToMatiere(this.matiereId,this.ThemeForm.value).subscribe(

        (data)=>{

          this.messageService.add({ severity: 'info', summary: 'تم إضافة محور جديد بنجاح', detail: 'تم إضافة محور جديد بنجاح' });
          this.closeModalAndNotify();
        },(error)=>{
          this.messageService.add({ severity: 'error', summary: 'لم يتم إضافة محور جديد', detail: 'لم يتم إضافة محور جديد' });

        }

      )
    }


    closeModalAndNotify() {

      this.menu.triggerNewItemAdded()
      this.ref.close();
  
    }

}
