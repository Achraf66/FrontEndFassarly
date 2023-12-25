import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Comptabilite } from '../models/Comptabilite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  BASE_URL:string

  constructor(private http:HttpClient) {

      this.BASE_URL = environment.fassarlyBaseUrl;

   }

  
    getAllUsers(){
        const USERURL = this.BASE_URL+'/api/utilisateur/getAllUtilisateurs'
       return this.http.get<User[]>(USERURL);
      }

    /*****************************Comptabiliteee****************************/
      getComptabiliteByUserId(userid:string)
      {
        const USERURL = `${this.BASE_URL}/api/utilisateur/getComptabilitesByUserId/${userid}`
        return this.http.get<Comptabilite[]>(USERURL);

      }


      createAndAffectComtabliteToUser(paye: number, nonPaye: number, matiereId: number, userId: number): Observable<any> {
        const apiUrl = `${this.BASE_URL}/api/comptabilite/createAndAffectComtabiliteToUser`;
      
        const params = new HttpParams()
          .set('paye', paye.toString())
          .set('nonPaye', nonPaye.toString())
          .set('idUser', userId.toString())
          .set('idMatiere', matiereId.toString());
      
        return this.http.post(apiUrl, null, { params });
      }


      deleteComptabiliteById(idComptabilite:number)
      {
        const apiUrl = `${this.BASE_URL}/api/comptabilite/removeComptabilite/${idComptabilite}`;
        return this.http.delete(apiUrl);
      }
      

}
