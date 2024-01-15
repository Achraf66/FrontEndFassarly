import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PrototypeExam } from 'src/app/modules/admin/adminmodules/prototypeExam/models/PrototypeExam';
import { PrototypeExamService } from 'src/app/modules/admin/adminmodules/prototypeExam/services/prototype-exam.service';

@Component({
  selector: 'app-prototype-exam-details',
  templateUrl: './prototype-exam-details.component.html',
  styleUrls: ['./prototype-exam-details.component.css']
})
export class PrototypeExamDetailsComponent implements OnInit {
  prototypeExamId: number;
  nomExamen: string;
  idExamen:number;
  PrototypeExam: PrototypeExam;

  constructor(public config: DynamicDialogConfig, private service: PrototypeExamService) {
    // Access prototypeExamId directly
    this.prototypeExamId = this.config.data.prototypeExamId;
    this.fetchPrototypeExams();
    this.nomExamen = this.config.data.nomExamen;
    this.idExamen = this.config.data.idExamen;

    
  }
  

  ngOnInit(): void {}

  fetchPrototypeExams() {
    // Use the actual prototypeExamId value
    this.service.getPrototypeExamsById(this.prototypeExamId).subscribe(
      (data) => {
        this.PrototypeExam = data;
      },
      (error) => {
        // Handle error appropriately
        console.error('Error fetching prototype exams:', error);
      }
    );
  }

  downloadExamFile( prototypeExamId: number,nomPrototypeExam:string) {
    this.service.downloadprototypeExamFile(this.idExamen, prototypeExamId).subscribe(
      (response: HttpResponse<ArrayBuffer>) => {
        if (response.body !== null) {
          this.handleDownload(response,this.nomExamen + " "+nomPrototypeExam);
        } else {
          console.error('Response body is null.');
        }
      },
      (error: any) => {
        console.error('Download failed:', error);
      }
    );
  }
  
  downloadPrototypeExamCorrectionFile( prototypeExamId: number,nomPrototypeExam:string) {
    this.service.downloadprototypeExamcorrectionFile(this.idExamen, prototypeExamId).subscribe(
      (response: HttpResponse<ArrayBuffer>) => {
        if (response.body !== null) {
          this.handleDownload(response,this.nomExamen + " "+nomPrototypeExam);
        } else {
          console.error('Response body is null.');
        }
      },
      (error: any) => {
        console.error('Download failed:', error);
      }
    );
  }
  
  private handleDownload(response: HttpResponse<ArrayBuffer>,examenname:string): void {
    // Check if the response has a valid body
    if (response.body !== null) {
      const blob = new Blob([response.body], { type: 'application/pdf' });
  
      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = examenname; 
      link.click();
    } else {
      console.error('Response body is null.');
    }
  }
}