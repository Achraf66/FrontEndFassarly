import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Matiere } from '../models/Matiere';
import { Observable } from 'rxjs';

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

  
  findMatiereByUser(numtel:string | null){
    return this.http.get<Matiere[]>(`${this.FASSARLY_URL}${this.MATIEREURL}findMatiereByUser/${numtel}`)
  }

  getMatiereById(idmatiere:number | null){
    return this.http.get<any>(`${this.FASSARLY_URL}${this.MATIEREURL}getMatiere/${idmatiere}`)
  }

}
