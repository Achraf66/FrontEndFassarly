import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

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


}
