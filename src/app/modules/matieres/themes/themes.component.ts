import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from '../../admin/adminmodules/themes/models/Theme';
import { ThemeService } from '../../admin/adminmodules/themes/services/theme.service';
import { MatiereService } from '../../admin/adminmodules/matieres/services/matiere.service';
import { Matiere } from '../../admin/adminmodules/matieres/Models/Matiere';
import { LessonService } from '../../admin/adminmodules/lessons/services/lesson.service';
import { Lesson } from '../../admin/adminmodules/lessons/Lesson';
import { EMPTY, Observable, catchError, mergeMap, of, switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../admin/adminmodules/users/models/User';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent  implements AfterViewInit{
  searchTerm="";
  matiereId: any;
  notThemesFoundMessage="لا يوجد محاور في هذه المادة بعد !"
  Themes:Theme[]=[]
  matiere:Matiere
  lessons:Lesson[]=[]
  currentUser: User | undefined;
  isAdmin : boolean = false;

  constructor(private title:Title,
    private route: ActivatedRoute,
    private themeService:ThemeService,
    private matiereService:MatiereService,
    private router:Router,
    private lessonService:LessonService,private authService:AuthService
    
    ){
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }  
    this.title.setTitle(" فسرلي | المحاور")


    const userId = this.authService.getUserId();

    

    this.fetchCurrentUser(userId).pipe(
      switchMap(data => {
        this.currentUser = data;
        return this.authService.findUserBynumTel(userId);
      }),
      catchError(error => {
        return of(null); 
      })
    ).subscribe(
      (data) => {
        if (data) {
          this.currentUser = data
          this.hasRolenolivesessions()
          this.checkAdminRole();

      
        } else {
        }
      },
      (error) => console.log('Error in findUserBynumTel:', error)
    );

    this.matiereId = this.route.snapshot.paramMap.get('matiereid') || null;
    if (this.matiereId !== null) {
      this.findMatiereById(this.matiereId)
      this.fetchThemes();
    }


  
  }

  ngAfterViewInit(): void {


  }

  navigateToLesson(matiereId: number, themeid: number): void {
    this.fetchLessonByThemeId(themeid).subscribe(() => {
      if (this.lessons[0]?.id === undefined) {
        this.showSweetAlert();
      } else {
        this.router.navigate(['/matieres/lesson/' + matiereId + '/' + themeid + '/' + this.lessons[0]?.id]);
      }
    });
  }
  
  showSweetAlert(): void {
    Swal.fire({
      icon: 'warning',
      title: 'لا توجد دروس',
      text: 'عذرًا، لا توجد دروس متاحة لهذا الموضوع.',
      confirmButtonText: 'تحويل',
    }).then((result) => {
      if (result.isConfirmed) {
        return ;
      }
    });
  }
  
  fetchLessonByThemeId(themeId: number): Observable<Lesson[]> {
    return this.lessonService.getLessonsByThemeId(themeId).pipe(
      tap(data => {
        this.lessons = data;
      }),
      catchError(error => {
        console.log(error);
        return EMPTY; 
      })
    );
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

    findMatiereById(idMatiere: number) {
      this.matiereService.getMatiereById(idMatiere).subscribe(
        (data) => {
          this.matiere = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
    

    // Fetch the current user based on userId
    private fetchCurrentUser(userId: string | null): Observable<any> {
      return this.authService.findUserBynumTel(userId).pipe(
        mergeMap((data) => {
          this.currentUser = data;
          return of(null);
        }),
        catchError((error) => {
          this.currentUser = undefined; // Set to undefined in case of an error
          return of(null);
        })
      );
    }
    
    //Check for silver Role
    hasRolenolivesessions(): boolean {    
      const hasRole = this.currentUser?.roles?.some(role => role.name.includes('silver'));    
      return hasRole || false;
    }

    checkAdminRole() {
      if (this.currentUser?.roles.some((role) => role.name.includes('admin'))) {
        this.isAdmin = true;
      }
    }
  
}
