import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Theme } from '../models/Theme';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  BASEURL:string
  constructor(private http:HttpClient) {
    this.BASEURL = environment.fassarlyBaseUrl;
   }


getThemesByMatiere(matiereid:number){

  return this.http.get<Theme[]>(`${this.BASEURL}/api/theme/findThemeByMatiereId/${matiereid}`)

}


deleteTheme(themeId:number){

  return this.http.delete(`${this.BASEURL}/api/theme/removeTheme/${themeId}`)

}

findThemesSearch(searchTerm :string ,matiereId :number){


  return this.http.get<Theme[]>(`${this.BASEURL}/api/theme/findThemesSearch/${searchTerm}/${matiereId}`)

}


getThemeById(idTheme: number): Observable<Theme> {
  const url = `${this.BASEURL}/api/theme/findThemeById/${idTheme}`;
  return this.http.get<Theme>(url);
}

updateThemeNameById(id: number, newThemeName: string): Observable<Theme> {
  const url = `${this.BASEURL}/api/theme/updateNameThemeById/${id}`;
  const params = new HttpParams().set('newThemeName', newThemeName);

  return this.http.put<Theme>(url, null, { params });
}

addThemeToMatiere(idMatiere: number, newTheme: Theme): Observable<Theme> {
  const url = `${this.BASEURL}/api/theme/addThemeToMatiere/${idMatiere}`;
  return this.http.post<Theme>(url, newTheme);
}

}
