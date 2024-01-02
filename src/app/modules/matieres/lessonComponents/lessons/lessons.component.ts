import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  safeVideoUrl!: SafeResourceUrl;
  videoPermissions: string = 'autoplay; encrypted-media; picture-in-picture; web-share';
  videoid:any
  videoUrl:any
  lesson$: Observable<Lesson>; 
  constructor(private sanitizer: DomSanitizer, private lessonService: LessonService) {}

  ngOnInit(): void {
    if (this.matiereId !== null && this.themeId !== null && this.lessonId !== null) {
      this.fetchLessonById();
  
      this.lesson$.subscribe(
        (data) => {
          this.videoid = data.videoLien;
          console.log(data);
  
          // Move the assignments here
          this.videoUrl = `https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Ffassarly%2Fvideos%2F${this.videoid}%2F&show_text=false&width=560&t=0`;
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
        }
      );
    }
  }
  

  fetchLessonById() {
    this.lesson$ = this.lessonService.fetchLessonById(this.lessonId);
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
  
  downloadPiecesJointes(themeId: number, lessonId: number) {
  
    this.lessonService.downloadPiecesJointes(themeId, lessonId)
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

}
