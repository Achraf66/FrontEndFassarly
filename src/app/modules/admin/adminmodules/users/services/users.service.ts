import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Comptabilite } from '../models/Comptabilite';
import { Observable, catchError, throwError } from 'rxjs';

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
      
      fetchUserById(idUser:number)
      {
        const apiUrl = `${this.BASE_URL}/api/utilisateur/getUtilisateur/${idUser}`;
        return this.http.get<User>(apiUrl);
      }

      updateUser(
        userId: number,
        password: string | null,
        nomPrenom: string,
        numeroTel: string,
        photoFile: File | null,
        roleId: number | null
      ): Observable<any> {
        const url = `${this.BASE_URL}/api/utilisateur/updateUserById/${userId}`;
      
        // Prepare form data
        const formData: FormData = new FormData();
        formData.append('nomPrenom', nomPrenom);
        formData.append('numeroTel', numeroTel);
      
        if (password !== null) {
          formData.append('password', password);
        }
      
        if (photoFile !== null) {
          formData.append('photoFile', photoFile, photoFile.name);
        }
      
        // Add roleId to form data if not null
        if (roleId !== null) {
          formData.append('roleId', roleId.toString());
        }
      
        // Make the request
        return this.http.put(url, formData);
      }



      getUserImage(userId: number): Observable<Blob> {
        const url = `${this.BASE_URL}/images/${userId}/image`;
    
        return this.http.get(url, { responseType: 'blob' }).pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError('Something went wrong while fetching user image.');
          })
        );
      }

      deleteUserById(idUser:number){
        const apiUrl = `${this.BASE_URL}/api/utilisateur/removeUtilisateur/${idUser}`;
        return this.http.delete(apiUrl);
      }
      
      searchUsers(searchTerm: string): Observable<User[]> {
        const params = new HttpParams().set('searchterm', searchTerm);
            return this.http.get<User[]>(`${this.BASE_URL}/api/utilisateur/search`, { params });
      }
    
      
      
      
}
