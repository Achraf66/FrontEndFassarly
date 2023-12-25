import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comptabilite } from '../../users/models/Comptabilite';

@Injectable({
  providedIn: 'root'
})
export class ComptabiliteService {
  BASEURL:string
  constructor(private http:HttpClient) {

    this.BASEURL = environment.fassarlyBaseUrl;

   }
   
   createAndAffectComptabiliteToUser(
    paye: number,
    nonPaye: number,
    idUser: number,
    idMatiere: number
  ): Observable<any> {
    const url = `${this.BASEURL}/api/comptabilite/createAndAffectComtabiliteToUser`;

    let params = new HttpParams();
    params = params.set('paye', paye.toString());
    params = params.set('nonPaye', nonPaye.toString());
    params = params.set('idUser', idUser.toString());
    params = params.set('idMatiere', idMatiere.toString());

    return this.http.get(url, { params });
  }



  GetComptabiliteById(comtabliteId:number){

    const url = `${this.BASEURL}/api/comptabilite/getComptabilite/${comtabliteId}`;

    return this.http.get<Comptabilite>(url);

  }




  editComptabilite(
    idComptabilite: number,
    paye: number,
    nonPaye: number,
    idMatiere: number
  ): Observable<any> {
    const url = `${this.BASEURL}/api/comptabilite/edit/${idComptabilite}`;
    
    const formData = new FormData();
    formData.append('newPaye', paye.toString());
    formData.append('newNonPaye', nonPaye.toString());
    formData.append('newIdMatiere', idMatiere.toString());


    return this.http.put(url, formData);
  }

  

}
