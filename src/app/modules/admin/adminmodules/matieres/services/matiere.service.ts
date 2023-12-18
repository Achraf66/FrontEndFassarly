import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Matiere } from '../Models/Matiere';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  BASEURL:string
  
  constructor(private http:HttpClient) {

    this.BASEURL = environment.fassarlyBaseUrl;


   }


   addmatiere(matiere:Matiere,file:File) {
    const formData: FormData = new FormData();
    formData.append('matiere', JSON.stringify(matiere));
    formData.append('file', file);
    console.log(file)
    const URL_ADD_MATIERE = `${this.BASEURL}/api/matiere/addMatiere`;
    return this.http.post(URL_ADD_MATIERE, formData);
  }
  


}
