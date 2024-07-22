import { Component,OnInit } from '@angular/core';
import { MatiereService } from '../services/matiere.service';
import { Matiere } from '../models/Matiere';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {
      
    baseImageUrl = `${environment.fassarlyBaseUrl}/images/matiereimage`;
    searchTerm: string;
    matieres: Matiere[] = [];
    userid :any
    
  constructor(
    private matiereservice:MatiereService,
    private router:Router,
    private auth:AuthService,
    private title:Title
  )
  {
    title.setTitle("فسرلي | المواد")
    this.userid = this.auth.getUserId()
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {

      return false;
      
    };
    this.loadMatieres(this.userid);
  }

  loadMatieres(numtel:string): void {
    this.matiereservice.findMatiereByUser(numtel).pipe(
      map((matieres) => {
        this.matieres = matieres;
        if (this.matieres.length === 0) {
          Swal.fire({
            title: 'مرحبًا بك في فسرلي',
            html: `
              <h3>لإضافة المحتوى الخاص بكم، يرجى التواصل معنا</h3>
              <h3>:على صفحتنا الفايسبوك </h3>

              <a href="https://www.facebook.com/fassarly" target="_blank">
                <img src="assets/images/facebookLogo.png" width="50" height="50" alt="Facebook">
              </a>
            `,
            confirmButtonText: 'حسنًا',
            imageUrl: 'assets/images/logo.png', 
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Custom image'
          });
        }
        
        return matieres
      }),
      catchError((error) => {
        console.error('Error loading matieres:', error);
        throw error; 
      }) ).subscribe()
    };
 
 
    getMatiereBynom(searchTerm: string) {
      this.matiereservice.searchMatiereByNom(searchTerm).pipe(
        map(
            (matieres)=>{
              this.matieres=matieres;
              return matieres
            }),
            catchError((error) => {
              console.error('Matiere not found:', error);
              throw error; 
            }) ).subscribe(matieres=>console.log(matieres))
          };
 
          navigateToThemeList(matiereId: number): void {
            this.router.navigate(['/matieres/themes/'+matiereId]);
          } 
}
  






