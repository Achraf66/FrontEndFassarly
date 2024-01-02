import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Examen } from '../../admin/adminmodules/exams/Examen';
import { LessonService } from '../../admin/adminmodules/lessons/services/lesson.service';
import { Lesson } from '../../admin/adminmodules/lessons/Lesson';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})


export class LessonComponent implements OnInit{
  matiereId:any
  themeId:any
  lessonId:any
  LessonList:Lesson[]
  lesson:Lesson
  view: CalendarView = CalendarView.Month;



  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  ExamenList : Examen[]


  constructor(
    private title:Title,
    private route:ActivatedRoute,
    private lessonService:LessonService,
    private router: Router

    ){

    this.title.setTitle(" فسرلي | الدرس ")
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.matiereId = params.get('matiereid') || null;
      this.themeId = params.get('themeid') || null;
      this.lessonId = params.get('lessonid')


      // Fetch the lessons based on themeId
      this.fetchLessonsByThemeId(this.themeId);

      // Check if there are lessons and navigate to the first lesson by default
      if (this.LessonList && this.LessonList.length > 0) {
        const firstLessonId = this.LessonList[0].id;
        this.navigateToLesson(firstLessonId);
      }
    });
  }

  fetchLessonsByThemeId(themeId: number) {
    this.lessonService.getLessonsByThemeId(themeId).subscribe(
      (data) => {
        this.LessonList = data;
      },
      (error) => console.log(error)
    );
  }

  navigateToLesson(lessonId: number): void {
    this.router.navigate(['/matieres/lesson', this.matiereId, this.themeId, lessonId]);
  }

  handleLessonClick(lessonId: number): void {
    this.router.navigate(['/matieres/lesson', this.matiereId, this.themeId, lessonId]);
  }


  fetchLessonById(){

    this.lessonService.fetchLessonById(this.lessonId).subscribe(
      (data)=>{
        this.lesson = data
      },(error)=>console.log(error)
    )
  }
}
