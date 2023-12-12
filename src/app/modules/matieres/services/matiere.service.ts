import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Matiere } from '../models/Matiere';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  private FASSARLY_URL = environment.fassarlyBaseUrl;
  MATIEREURL:String='/api/matiere/';

  constructor(private http:HttpClient) { }

  getAllMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.FASSARLY_URL}${this.MATIEREURL}getAllMatieres`)
  }

  getMatiereBynom(nomMatiere: string):Observable<Matiere[]>
  {
    return this.http.get<Matiere[]>(`${this.FASSARLY_URL}${this.MATIEREURL}getMatiereByNom/${nomMatiere}`)
  }
  



}
