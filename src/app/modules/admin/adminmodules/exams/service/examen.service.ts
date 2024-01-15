import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    nomExamen: string
  ): Observable<any> {
    const URL_CREATE_Examen = `${this.BASEURL}/api/examen/create`;
  
    const formData: FormData = new FormData();
    formData.append('matiereId', JSON.stringify(matiereId));
    formData.append('nomExamen', nomExamen);

    return this.http.post<any>(URL_CREATE_Examen, formData);
  }
  



  fetchExamenById(examenId:number){
    const url = `${this.BASEURL}/api/examen/fetchExamenById/${examenId}`;
    return this.http.get<Examen>(url);
  }

  editExamen(
    examenId: number,
    nomExamen: string
      ): Observable<Examen> {
    const formData = new FormData();
    formData.append('nomExamen', nomExamen);
  
    return this.http.put<Examen>(`${this.BASEURL}/api/examen/edit/${examenId}`, formData);
  }

  deleteExamenAndFolderById(idExam:number){
    return this.http.delete(`${this.BASEURL}/api/examen/delete/exam/${idExam}`)
  }

  searchExamens(partialNomExamen: string): Observable<any> {
    const params = new HttpParams().set('partialNomExamen', partialNomExamen);
    return this.http.get<any>(`${this.BASEURL}/api/examen/search`, { params });
  }

}
