import { Component, OnInit, Sanitizer, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css'],
  encapsulation:ViewEncapsulation.None,
})


export class LessonComponent implements OnInit{

  videoUrl:any
  videoid :any ;
  safeVideoUrl!: SafeResourceUrl;
  videoPermissions: string = 'autoplay; encrypted-media; picture-in-picture; web-share';


  viewDate: Date = new Date();

  events: CalendarEvent[] = [];



  constructor(private title:Title,private sanitizer: DomSanitizer){

    title.setTitle(" فسرلي | الدرس عدد 01")
  
  }

  ngOnInit(): void {
    
    this.videoid = "440774338181188";
    this.videoUrl = `https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Ffassarly%2Fvideos%2F${this.videoid}%2F&show_text=false&width=560&t=0`;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }
  

}
