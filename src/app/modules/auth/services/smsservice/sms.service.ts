import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VerifySmsRequest } from '../../models/VerifySmsRequest';
import { AuthResponseData } from '../../models/AuthResponseData';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  BASEURL;
  private phoneUser: string | null = null;

  constructor(private http:HttpClient) { 
    this.BASEURL = environment.fassarlyBaseUrl;
  }

  setphoneUser(phoneUser: string|null) : void {
    this.phoneUser = phoneUser;
  }

  getphoneUser(): string | null {
    return this.phoneUser;
  }


  verifySmsCode(VerifySmsRequest:VerifySmsRequest){
    const URL = `${this.BASEURL}/api/v1/auth/verify-sms`
    return  this.http.post<AuthResponseData>(URL,VerifySmsRequest);
  }


}
