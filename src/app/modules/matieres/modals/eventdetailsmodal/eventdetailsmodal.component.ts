import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

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

  constructor(public config: DynamicDialogConfig)
    {
      this.lienzoom = this.config.data.lienzoom
      this.heuredebut = this.config.data.heuredebut
      this.heurefin = this.config.data.heurefin
      this.titleevent= this.config.data.titleevent
  }

  redirect() {
    const redirectToUrl = this.lienzoom;
    window.open(redirectToUrl, '_blank');
  }
  
}
