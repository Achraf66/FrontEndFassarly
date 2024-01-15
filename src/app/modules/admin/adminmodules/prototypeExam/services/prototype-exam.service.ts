import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrototypeExam } from '../models/PrototypeExam';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrototypeExamService {

  BASEURL:any;
  constructor(private http:HttpClient) {
      this.BASEURL = environment.fassarlyBaseUrl;
   }

   createAndAffectPrototypeExamToExamen(
    nomPrototypeExam: string,
    examFile: File,
    correctionFile: File,
    correctionLink: string,
    examenId: number
  ): Observable<PrototypeExam> 
  {
    const formData = new FormData();
    formData.append('nomPrototypeExam', nomPrototypeExam);
    formData.append('examFile', examFile);
    formData.append('correctionFile', correctionFile);
    formData.append('correctionLink', correctionLink);
    formData.append('examenId', examenId.toString());
    return this.http.post<PrototypeExam>(`${this.BASEURL}/api/prototypeExam/createAndAffectPrototypeExam`, formData);
  }
   
  getPrototypeExamsByExamenId(examenId: number): Observable<PrototypeExam[]> {
    const url = `${this.BASEURL}/api/prototypeExam/prototype-exams/examen/${examenId}`;
    return this.http.get<PrototypeExam[]>(url);
  }

  downloadprototypeExamcorrectionFile(examenId: number, prototypeExamId: number): Observable<HttpResponse<ArrayBuffer>> {
    const url = `${this.BASEURL}/download/prototypeExam/correction/${examenId}/${prototypeExamId}`;
    return this.http.get(url, { observe: 'response', responseType: 'arraybuffer' });
  }

  downloadprototypeExamFile(examenId: number, prototypeExamId: number): Observable<HttpResponse<ArrayBuffer>> {
    const url = `${this.BASEURL}/download/prototypeExam/ExamPrototypeFile/${examenId}/${prototypeExamId}`;
    return this.http.get(url, { observe: 'response', responseType: 'arraybuffer' });
  }


  getPrototypeExamsById(prototypeExamId: number): Observable<PrototypeExam> {
    const url = `${this.BASEURL}/api/prototypeExam/prototype-exams/${prototypeExamId}`;
    return this.http.get<PrototypeExam>(url);
  }

  deletePrototypeExamsById(prototypeExamId: number){
    const url = `${this.BASEURL}/api/prototypeExam/prototype-exams/${prototypeExamId}`;
    return this.http.delete<PrototypeExam>(url);
  }

  editPrototypeExam(
    prototypeExamId:number,
    nomPrototypeExam: string,
    examFile: File,
    correctionFile: File,
    correctionLink: string,
  ): Observable<PrototypeExam> 
  {
    const formData = new FormData();
    formData.append('nomPrototypeExam', nomPrototypeExam);
    formData.append('examFile', examFile);
    formData.append('correctionFile', correctionFile);
    formData.append('correctionLink', correctionLink);
    return this.http.put<PrototypeExam>(`${this.BASEURL}/api/prototypeExam/edit/${prototypeExamId}`, formData);
  }

}
