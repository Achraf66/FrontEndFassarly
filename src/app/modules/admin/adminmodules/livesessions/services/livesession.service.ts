import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
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



   createSeanceEnLigneAndAffectToMatiere(matiereId: number, seanceEnLigne: SeanceEnLigne, homeWorkFile: File): Observable<any> {
    const formData = new FormData();
  
    // Check if seanceEnLigne.date is not null before appending
    if (seanceEnLigne.date !== null && seanceEnLigne.date !== undefined) {
      formData.append('date', seanceEnLigne.date.toString());
    }
    
    formData.append('heureDebut', seanceEnLigne.heureDebut);
    formData.append('heureFin', seanceEnLigne.heureFin);
    formData.append('titre', seanceEnLigne.titre);
    formData.append('lienZoom', seanceEnLigne.lienZoom);
    formData.append('homeWorkFile', homeWorkFile);
  
    const url = `${this.BASEURL}/api/seanceEnLigne/createSeanceEnLigneAndAffectToMatiere/${matiereId}`;
  
    return this.http.post(url, formData);
  }
  
  
  editSeanceEnLigne(seanceEnLigneId: number, seanceEnLigne: SeanceEnLigne, homeWorkFile: File) {
    const formData = new FormData();

    // Check if seanceEnLigne.date is not null before appending
    if (seanceEnLigne.date !== null && seanceEnLigne.date !== undefined) {
      formData.append('date', seanceEnLigne.date.toString());
    }
    
    formData.append('heureDebut', seanceEnLigne.heureDebut);
    formData.append('heureFin', seanceEnLigne.heureFin);
    formData.append('titre', seanceEnLigne.titre);
    formData.append('lienZoom', seanceEnLigne.lienZoom);
    formData.append('homeWorkFile', homeWorkFile);

    const url = `${this.BASEURL}/api/seanceEnLigne/editSeanceEnLigne/${seanceEnLigneId}`;

    return this.http.put(url, formData);
  }


   GetSeanceEnLigne(sessionId:number){
    const SESSIONLIVEURL= `${this.BASEURL}/api/seanceEnLigne/getSeanceEnLigne/${sessionId}`
    return this.http.get<SeanceEnLigne>(SESSIONLIVEURL);
   }


   editSeanceEnLigneById(seanceEnLigneId:number,SeanceEnLigne:SeanceEnLigne){
    const SESSIONLIVEURL= `${this.BASEURL}/api/seanceEnLigne/editSeanceEnLigne/${seanceEnLigneId}`
    return this.http.put(SESSIONLIVEURL,SeanceEnLigne);
   }



  downloadLiveSessionHomeworkFile(filename: string,liveSessionId:number): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.BASEURL}/download/LiveSessionHomeworkFile/${filename}/${liveSessionId}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

    deleteSeanceEnLigneById(seanceEnLigneId:number){
    const SESSIONLIVEURL= `${this.BASEURL}/api/seanceEnLigne/deleteLiveSessinById/${seanceEnLigneId}`
    return this.http.delete(SESSIONLIVEURL);
   }

}
