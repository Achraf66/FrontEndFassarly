import { Component, OnInit } from '@angular/core';
import { MatiereService } from '../services/matiere.service';
import { Matiere } from '../models/Matiere';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {
      
    baseImageUrl = `${environment.fassarlyBaseUrl}/images/matiereimage`;
    searchTerm: string;
    matieres: Matiere[] = [];
   
    numtel = '56239812'
    
  constructor(private matiereservice:MatiereService,private router:Router)
  {}

  ngOnInit(): void {
    this.loadMatieres();
  }

  loadMatieres(): void {
    this.matiereservice.getAllMatieres().pipe(
      map((matieres) => {
        this.matieres = matieres;
        return matieres
      }),
      catchError((error) => {
        console.error('Error loading matieres:', error);
        throw error; 
      }) ).subscribe(matieres=>console.log(matieres))
    };
 
 
    getMatiereBynom(searchTerm: string) {
      this.matiereservice.getMatiereBynom(searchTerm).pipe(
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
  






