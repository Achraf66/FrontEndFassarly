import { HttpEventType, HttpResponse } from '@angular/common/http';
import {Component,Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/modules/admin/adminmodules/lessons/Lesson';
import { LessonService } from 'src/app/modules/admin/adminmodules/lessons/services/lesson.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})


export class LessonsComponent implements OnInit{
  @Input() matiereId: any;
  @Input() themeId: any;
  @Input() lessonId: any;
  videoid:any
  lesson$: Observable<Lesson>; 


  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    if (this.matiereId !== null && this.themeId !== null && this.lessonId !== null) {
      this.fetchLessonById();
      this.lesson$.subscribe(
        (data) => {
          this.videoid = data.videoLien;
        }
      );
    }


  }
  
  fetchLessonById() {
    this.lesson$ = this.lessonService.fetchLessonById(this.lessonId);
  }

  private handleDownloadLesson(response: HttpResponse<ArrayBuffer>,lessonName:string): void {
    // Check if the response has a valid body
    if (response.body !== null) {
      const blob = new Blob([response.body], { type: 'application/pdf' });
  
      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download =lessonName; 
      link.click();
      
    } else {
      console.error('Response body is null.');
    }
  }
  
  downloadFile(filename: string, lessonId: number , lessonName:string): void {
    this.lessonService.download(filename, lessonId)
      .subscribe(
        (event: any) => {
          if (event.type === HttpEventType.DownloadProgress) {
          } else if (event instanceof HttpResponse) {
            this.handleDownloadLesson(event,lessonName);
          }
        },
        (error) => {
          console.error('Error downloading file:', error);
        }
      );
  }
  



}
