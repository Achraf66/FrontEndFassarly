import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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


}
