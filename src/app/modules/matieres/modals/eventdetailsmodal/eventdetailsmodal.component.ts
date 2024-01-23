import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { catchError } from 'rxjs';
import { SeanceEnLigne } from 'src/app/modules/admin/adminmodules/livesessions/models/SeanceEnLigne';
import { LivesessionService } from 'src/app/modules/admin/adminmodules/livesessions/services/livesession.service';

@Component({
  selector: 'app-eventdetailsmodal',
  templateUrl: './eventdetailsmodal.component.html',
  styleUrls: ['./eventdetailsmodal.component.css']
})
export class EventdetailsmodalComponent {
  titleevent:any
  lienzoom: any;  
  heuredebut: any;    
  heurefin: any;    
  liveSessionId:any;
  LiveSession:SeanceEnLigne
  constructor(public config: DynamicDialogConfig,private liveSesssions:LivesessionService,private messageService:MessageService)
    {
      this.lienzoom = this.config.data.lienzoom
      this.heuredebut = this.config.data.heuredebut
      this.heurefin = this.config.data.heurefin
      this.titleevent= this.config.data.titleevent
      this.liveSessionId = this.config.data.liveSessionId
      this.fetchLiveSession();
  }

  redirect() {
    const redirectToUrl = this.lienzoom;
    window.open(redirectToUrl, '_blank');
  }
  

  fetchLiveSession(){
    this.liveSesssions.GetSeanceEnLigne(this.liveSessionId).subscribe(
        (data)=>{
          this.LiveSession = data
        },(error)=>catchError(error)
    )      

  }


  downloadFile(): void {
    this.liveSesssions.downloadLiveSessionHomeworkFile(this.LiveSession.homeWorkFileName, this.LiveSession.id)
      .subscribe(
        (event: any) => {
          if (event.type === HttpEventType.DownloadProgress) {
          } else if (event instanceof HttpResponse) {
            this.handleDownloadLesson(event,this.LiveSession.titre);
          }
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'حصل عطل عند التحميل',
            detail: 'حصل عطل عند التحميل',
            life: 3000
          }); 
              }
      );
  }

  private handleDownloadLesson(response: HttpResponse<ArrayBuffer>,SessionName:string): void {
    // Check if the response has a valid body
    if (response.body !== null) {
      const blob = new Blob([response.body], { type: 'application/pdf' });
  
      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download =SessionName; 
      link.click();
      
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'حصل عطل عند التحميل',
        detail: 'حصل عطل عند التحميل',
        life: 3000
      });  
    }
  }
}
