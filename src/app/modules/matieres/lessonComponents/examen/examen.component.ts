import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { Examen } from 'src/app/modules/admin/adminmodules/exams/Examen';
import { ExamenService } from 'src/app/modules/admin/adminmodules/exams/service/examen.service';
import { CorrectionVideoModalComponent } from '../../modals/correction-video-modal/correction-video-modal.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit{
  @Input() matiereId: any;
  @Input() themeId: any;

  videoUrl:any
  videoid :any ;
  safeVideoUrl!: SafeResourceUrl;
  videoPermissions: string = 'autoplay; encrypted-media; picture-in-picture; web-share';

  ExamenList : Examen[]

  ngOnInit(): void {
    if (this.matiereId !== null && this.themeId !== null) {
      this.fetchGetExamensByMatiere();
    }

  }


  constructor(
    private examenService:ExamenService ,
    private dialogService:DialogService
    )
  {

  }

  /*****************************************************************************************************/
  fetchGetExamensByMatiere(){
    this.examenService.GetExamensMatiere(this.matiereId).subscribe(

      (data)=>{
        this.ExamenList = data
      },
      (error)=>{
        console.log(error)
      }
      )
  }

/*****************************************************************************************************/
  downloadCorrection(matiereId: number, examenId: number,examenname:string) {
    this.examenService.downloadCorrectionFile(matiereId, examenId).subscribe(
      (response: HttpResponse<ArrayBuffer>) => {
        if (response.body !== null) {
          this.handleDownload(response,examenname);
        } else {
          console.error('Response body is null.');
        }
      },
      (error: any) => {
        console.error('Download failed:', error);
      }
    );
  }
/*****************************************************************************************************/
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
  

/*****************************************************************************************************/
downloadPiecesJointes(matiereId:number ,examenId:number) {

    this.examenService.downloadPiecesJointes(matiereId, examenId)
      .subscribe(blob => {
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);

        downloadLink.href = url;
        downloadLink.download = 'pieces_jointes.zip';

        document.body.appendChild(downloadLink);
        downloadLink.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);
      });
  }

/*****************************************************************************************************/
public OpenCorrectionVideoModalComponent(examenId: number, ExamenNom: string): void {
  this.dialogService.open(CorrectionVideoModalComponent, {
    showHeader: false, 
    width: '55%',
    height: '80%',
    dismissableMask: true,
    contentStyle: { 'background-color': 'rgba(0, 0, 0, 0)', 'border': 'none' },
    baseZIndex: 1000,
    data: {
      matiereid: this.matiereId,
      examenId: examenId,
      ExamenNom: ExamenNom,
    },
  });
}
/*****************************************************************************************************/


  

}
