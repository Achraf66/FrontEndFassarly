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



  
// In your Angular component
extractFileName(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}


}
