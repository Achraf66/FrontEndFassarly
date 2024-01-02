import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from '../../admin/adminmodules/themes/models/Theme';
import { ThemeService } from '../../admin/adminmodules/themes/services/theme.service';
import { MatiereService } from '../../admin/adminmodules/matieres/services/matiere.service';
import { Matiere } from '../../admin/adminmodules/matieres/Models/Matiere';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent {
  searchTerm="";
  matiereId: any;
  notThemesFoundMessage="لا يوجد محاور في هذه المادة بعد !"
  Themes:Theme[]=[]
  matiere:Matiere

  constructor(private title:Title,
    private route: ActivatedRoute,
    private themeService:ThemeService,
    private matiereService:MatiereService,
    private router:Router
    
    ){

    this.title.setTitle(" فسرلي | المحاور")

    this.matiereId = this.route.snapshot.paramMap.get('matiereid') || null;

    if (this.matiereId !== null) {
      this.findMatiereById(this.matiereId)
      this.fetchThemes();
    }

    
  

  
  }


  navigateToLesson(matiereId: number , themeId:number): void {
    this.router.navigate(['/matieres/lesson/'+matiereId+'/'+themeId+'/'+1]);
  } 


  fetchThemes(){

    this.themeService.getThemesByMatiere(this.matiereId).subscribe(

      (data)=>{
        this.Themes = data
      },(error)=>{
      }

    )

  }

  formatNumber(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }


  findThemesSearch(searchTerm :string){

    this.themeService.findThemesSearch(searchTerm,this.matiereId).subscribe(
    
      (data)=>{
        this.Themes=data
      },(error)=>{
        error
      }
    
    )
    
    }

    findMatiereById(idMatiere:number){

      this.matiereService.getMatiereById(idMatiere).subscribe(

        (data)=> {
          this.matiere = data
        }
      )


    }
  
}
