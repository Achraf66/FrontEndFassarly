import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lesson } from '../Lesson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  BASEURL:string
  constructor(private http:HttpClient) { 

    this.BASEURL = environment.fassarlyBaseUrl;

  }


  getLessonsByThemeId(idTheme:number):Observable<Lesson[]>
  {
    const URL = `${this.BASEURL}/api/lesson/getLessonsByTheme/${idTheme}`
    return this.http.get<Lesson[]>(URL)
  }


  createLessonAndAffectToTheme(
    idTheme: number,
    nomLesson: string,
    videoLien: string,
    description: string,
    piecesJointes: File[]
  ) {
    const URL = `${this.BASEURL}/api/lesson/createLessonAndAffectToTheme/${idTheme}`;
    const Formdata: FormData = new FormData();
    Formdata.append('nomLesson', nomLesson);
    Formdata.append('videoLien', videoLien);
    Formdata.append('description', description);
  
    if (piecesJointes) {
      for (let i = 0; i < piecesJointes.length; i++) {
        Formdata.append('piecesJointes', piecesJointes[i]);
      }
    }
  
    // Adjust the return type using 'as'
    return this.http.post(URL, Formdata);
  }
  

  download(filename: string,lessonId:number): Observable<HttpEvent<Blob>> {

    return this.http.get(`${this.BASEURL}/download/lessonfile/${filename}/${lessonId}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }



  fetchLessonById(idLesson:number){
    const URL = `${this.BASEURL}/api/lesson/getLesson/${idLesson}`
    return this.http.get<Lesson>(URL);
  }


  deleteLessonById(idLesson:number){

    const URL = `${this.BASEURL}/api/lesson/delete/lesson/${idLesson}`
    return this.http.delete(URL);

  }



  updateLesson(lessonId:number,nomLesson:string,videoLien:string,description:string,piecesJointes:File[])
  {
    const URL = `${this.BASEURL}/api/lesson/editLesson/${lessonId}`
    const Formdata : FormData = new FormData();
    Formdata.append('nomLesson',nomLesson)
    Formdata.append('videoLien',videoLien)
    Formdata.append('description',description)
    if(piecesJointes){
      for (let i = 0; i < piecesJointes.length; i++) {
        Formdata.append('piecesJointes', piecesJointes[i]);
      }
    }
 
    return this.http.put(URL,Formdata);
  }


}
