import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from '../models/RegisterRequest';
import { AuthResponseData } from '../models/AuthResponseData';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import { User } from '../../admin/adminmodules/users/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private userId: string | null = null;

  private expToken: string | null = null;

  

  setexpToken(expToken: string|null) : void {
    this.expToken = expToken;
  }

  getexpToken(): string | null {
    return this.expToken;
  }
  



  setUserId(userId: string|null) : void {
    this.userId = userId;
  }

  getUserId(): string | null {
    return this.userId;
  }
  
  private BASE_URL: string;

  constructor(private http:HttpClient) {
    this.BASE_URL = environment.fassarlyBaseUrl;
   }



   findUserBynumTel(numtel:String | null){
    const URL = `${this.BASE_URL}/api/utilisateur/findByNumeroTel/${numtel}`
    return this.http.get<User>(URL); 
   }



  register(RegisterRequest:RegisterRequest)
  {
    const REGISTER_URL = `${this.BASE_URL}/api/v1/auth/register`
    return this.http.post<AuthResponseData>(REGISTER_URL,RegisterRequest); 

  }


  login (AuthenticationRequest : AuthenticationRequest)
  {
    
    const LOGIN_URL = `${this.BASE_URL}/api/v1/auth/login`
    return this.http.post<AuthResponseData>(LOGIN_URL,AuthenticationRequest); 
  }


  logout(numTel: string): Observable<AuthResponseData> {
  const LOGOUT_URL = `${this.BASE_URL}/api/v1/auth/logout?numtel=${numTel}`;
  return this.http.post<AuthResponseData>(LOGOUT_URL, null); 
}



  isAuthenticated(): boolean {

    return localStorage.getItem('accesstoken') !== null;

  }





}
