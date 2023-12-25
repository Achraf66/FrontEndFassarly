import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Matiere } from '../Models/Matiere';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  BASEURL:string
  

  private matiereUpdatedSubject = new Subject<void>();

  matiereUpdated$ = this.matiereUpdatedSubject.asObservable();

  notifyMatiereUpdated() {
    this.matiereUpdatedSubject.next();
  }
  
  constructor(private http:HttpClient) {
    this.BASEURL = environment.fassarlyBaseUrl;
   }


   addmatiere(nomMatiere:string,file:File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('nomMatiere',nomMatiere)
    const URL_ADD_MATIERE = `${this.BASEURL}/api/matiere/addMatiere`;
    return this.http.post(URL_ADD_MATIERE, formData);
  }


  getAllMatieres(): Observable<Matiere[]> {
    const URL_GETALLMATIERES = `${this.BASEURL}/api/matiere/getAllMatieres`;
    return this.http.get<Matiere[]>(`${URL_GETALLMATIERES}`)
  }

  getMatiereById(id:number)
  {
    const URL_GETMATIEREBYID = `${this.BASEURL}/api/matiere/getMatiere/${id}`;

    return this.http.get<Matiere>(`${URL_GETMATIEREBYID}`)

  }

  ModifyMatiere(matiereId: number, nomMatiere: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nomMatiere', nomMatiere);
    formData.append('file', file);
  
    const URL_UPDATE_MATIERE = `${this.BASEURL}/api/matiere/updateMatiere/${matiereId}`;
    
    return this.http.put(URL_UPDATE_MATIERE, formData);
  }
  

DeleteMatiereById(matiereId:number)
{

  const URL_DELETE = `${this.BASEURL}/api/matiere/removeMatiere/${matiereId}`;
  return this.http.delete(URL_DELETE);


}

getMatiereBynom(nomMatiere: string):Observable<Matiere[]>
{
  return this.http.get<Matiere[]>(`${this.BASEURL}/api/matiere/getMatiereByNom/${nomMatiere}`)
}




}
