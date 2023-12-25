import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Examen } from '../Examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  BASEURL:string
  constructor(private http:HttpClient) { 

    this.BASEURL = environment.fassarlyBaseUrl;

  }



  GetExamensMatiere(matiereId: number) {
    const URL_DELETE = `${this.BASEURL}/api/examen/findExamenByMatiereId/${matiereId}`;
    return this.http.get<Examen[]>(URL_DELETE)
  }
  

}
