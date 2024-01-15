import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../models/Theme';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditThemeComponent } from '../edit-theme/edit-theme.component';
import { MenuService } from '../../../users/services/MenuService';
import { AddThemeToMatiereComponent } from '../add-theme-to-matiere/add-theme-to-matiere.component';
import { LessonsByThemeComponent } from '../../../lessons/componenets/lessons-by-theme/lessons-by-theme.component';

@Component({
  selector: 'app-themes-by-matiere',
  templateUrl: './themes-by-matiere.component.html',
  styleUrls: ['./themes-by-matiere.component.css']
})
export class ThemesByMatiereComponent implements OnInit{
  matiereId: number;
  matierenom:string
  themes: Theme[] = []
  title:string  ;
  searchTerm:string=''

  showConfirmationDialogTheme:Boolean = false;

  constructor(
    private dialogService:DialogService,
    public config: DynamicDialogConfig,
    private themeservice:ThemeService,
    private confirmationService: ConfirmationService,
    private messageService:MessageService,
    private menu:MenuService

    ) { }

  ngOnInit() {

    this.matiereId = this.config.data.matiereid
    this.matierenom = this.config.data.matierenom

    this.fetchThemes(this.matiereId);
    this.title = this.matierenom
    
this.menu.newItemAdded$.subscribe(() => {
  this.fetchThemes(this.matiereId)
});

  }


  fetchThemes(matiereId:number){

    this.themeservice.getThemesByMatiere(matiereId).subscribe(

      (data:Theme[])=>{

          this.themes = data



      },(error)=>{
        console.log(error)
      }

    )
    
  }

  deleteTheme(themeId:number){
    this.themeservice.deleteTheme(themeId).subscribe(
      (data)=>{
        this.fetchThemes(this.matiereId);
      },(error)=>{
        console.log(error)
      }
    )
  }



  public openModifyThemeDialog(idTheme:number): void {
     this.dialogService.open(EditThemeComponent, {
      header: 'تغيير بيانات الدرس',
      width: '30%',
      height: '50%',
      data: {
        idTheme:idTheme
      },
    });

  }




  deletetheme(event: Event,idTheme:number) {
    this.showConfirmationDialogTheme = true;
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'هل تريد فعلاً حذف هذا الدرس؟',
        header: 'هل تريد فعلاً حذف هذا الدرس؟',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        acceptLabel: 'نعم',
        rejectLabel: 'لا',
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.showConfirmationDialogTheme = false;

            this.messageService.add({ severity: 'info', summary: 'تم الحذف بنجاح', detail: 'تم الحذف بنجاح' });
          this.deleteTheme(idTheme);

        },
        reject: () => {
          this.showConfirmationDialogTheme = false;

            this.messageService.add({ severity: 'error', summary: 'لم يتم حذف هذا الدرس', detail: 'لم يتم حذف هذا الدرس', life: 3000 });
        }
    });
}


findThemesSearch(searchTerm :string){

this.themeservice.findThemesSearch(searchTerm,this.matiereId).subscribe(

  (data)=>{
    this.themes=data
  },(error)=>{
    error
  }

)

}

public openNewAddNewThemeModal(): void {
  this.dialogService.open(AddThemeToMatiereComponent, {
   header: 'إضافة درس جديد',
   width: '30%',
   height: '50%',
   dismissableMask:true,
   data: {
    matiereId:this.matiereId
   },
 });

}



public OpenLessonsByThemes(idTheme:number,nomTheme:string): void {
  this.dialogService.open(LessonsByThemeComponent, {
   header: 'مقاطع فيديو الدرس : '+nomTheme,
   width: '100%',
   height: '125%',
   dismissableMask:false,
   data: {
    matiereId:this.matiereId,
    idTheme:idTheme,
    nomTheme:nomTheme
   }
 });

}

}
