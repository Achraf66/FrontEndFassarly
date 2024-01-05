import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SeanceEnLigne } from '../models/SeanceEnLigne';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivesessionService {
  BASEURL
  constructor(private http:HttpClient) {

    this.BASEURL = environment.fassarlyBaseUrl;

   }


   getSessionLiveByMatiereId(matiereId:number):Observable<SeanceEnLigne[]>
   {
    const SESSIONLIVEURL= `${this.BASEURL}/api/seanceEnLigne/getSessionLiveByMatiereId/${matiereId}`
    return this.http.get<SeanceEnLigne[]>(SESSIONLIVEURL);
   }



   

   CreateSeanceEnLigneAndAffectToMatiere(matiereId:number,SeanceEnLigne:SeanceEnLigne){
    const SESSIONLIVEURL= `${this.BASEURL}/api/seanceEnLigne/createSeanceEnLigneAndAffectToMatiere/${matiereId}`
    return this.http.post(SESSIONLIVEURL,SeanceEnLigne);
   }



   GetSeanceEnLigne(sessionId:number){
    const SESSIONLIVEURL= `${this.BASEURL}/api/seanceEnLigne/getSeanceEnLigne/${sessionId}`
    return this.http.get<SeanceEnLigne>(SESSIONLIVEURL);
   }


   editSeanceEnLigneById(seanceEnLigneId:number,SeanceEnLigne:SeanceEnLigne){
    const SESSIONLIVEURL= `${this.BASEURL}/api/seanceEnLigne/editSeanceEnLigne/${seanceEnLigneId}`
    return this.http.put(SESSIONLIVEURL,SeanceEnLigne);
   }



    deleteSeanceEnLigneById(seanceEnLigneId:number){
    const SESSIONLIVEURL= `${this.BASEURL}/api/seanceEnLigne/removeSeanceEnLigne/${seanceEnLigneId}`
    return this.http.delete(SESSIONLIVEURL);
   }

}
