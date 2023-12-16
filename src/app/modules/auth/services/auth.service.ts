import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from '../models/RegisterRequest';
import { AuthResponseData } from '../models/AuthResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL: string;

  constructor(private http:HttpClient) {

    this.BASE_URL = environment.fassarlyBaseUrl;


   }



  register(RegisterRequest:RegisterRequest)
  {
    const REGISTER_URL = `${this.BASE_URL}/api/v1/auth/register`
    return this.http.post<AuthResponseData>(REGISTER_URL,RegisterRequest); 

  }


}
