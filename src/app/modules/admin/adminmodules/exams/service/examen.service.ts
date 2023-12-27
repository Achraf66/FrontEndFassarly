import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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



  createExamenAndAffectToMatiere(
    matiereId: number,
    nomExamen: string,
    videoLien: string,
    correctionFile: File,
    pieceJointes: File[]
  ): Observable<any> {
    const URL_CREATE_Examen = `${this.BASEURL}/api/examen/create`;
  
    const formData: FormData = new FormData();
    formData.append('matiereId', JSON.stringify(matiereId));
    formData.append('nomExamen', nomExamen);
    formData.append('videoLien', videoLien);
    formData.append('correctionFile', correctionFile);
  
    for (let i = 0; i < pieceJointes.length; i++) {
      formData.append('pieceJointes', pieceJointes[i]);
    }
  
  
    return this.http.post<any>(URL_CREATE_Examen, formData);
  }
  

  downloadCorrectionFile(matiereId: number, examenId: number): Observable<HttpResponse<ArrayBuffer>> {
    const url = `${this.BASEURL}/download/exam/correction/${matiereId}/${examenId}`;
    return this.http.get(url, { observe: 'response', responseType: 'arraybuffer' });
  }

  

}
