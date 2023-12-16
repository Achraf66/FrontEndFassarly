import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  BASE_URL:string
  constructor(private http:HttpClient) {


    this.BASE_URL = environment.fassarlyBaseUrl
   }



  
  getAllroles()
  {   
  
  const ROLESURL = `${this.BASE_URL}/api/roles/getAllRoles`
  return this.http.get(ROLESURL); 


  }
}
