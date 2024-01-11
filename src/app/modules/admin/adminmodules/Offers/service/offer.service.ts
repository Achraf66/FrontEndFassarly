import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/Offer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  BASEURL:string
  constructor(private http:HttpClient) {
    this.BASEURL = environment.fassarlyBaseUrl;
   }

  createOrUpdateOffer(Offer:Offer){
      const URL = `${this.BASEURL}/api/offers/createOrUpdateOffer`
      return this.http.post(URL,Offer);
  }

  getOfferById(idOffer:number) :Observable<Offer>{
    const URL = `${this.BASEURL}/api/offers/${idOffer}`
    return this.http.get<Offer>(URL);
}


}
