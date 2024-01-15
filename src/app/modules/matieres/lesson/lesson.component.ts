import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Examen } from '../../admin/adminmodules/exams/Examen';
import { LessonService } from '../../admin/adminmodules/lessons/services/lesson.service';
import { Lesson } from '../../admin/adminmodules/lessons/Lesson';
import { MatiereService } from '../services/matiere.service';
import { catchError } from 'rxjs';
import { Matiere } from '../models/Matiere';
import { ThemeService } from '../../admin/adminmodules/themes/services/theme.service';
import { Theme } from '../../admin/adminmodules/themes/models/Theme';

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
  Matiere:Matiere
  Theme:Theme
  ExamenList : Examen[]



  constructor(
    private title:Title,
    private route:ActivatedRoute,
    private lessonService:LessonService,
    private router: Router,
    private MatiereService:MatiereService,
    private themeService:ThemeService,
    ){

    this.title.setTitle(" فسرلي | الدرس ")
    
  }


  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.matiereId = params.get('matiereid') || null;
      this.themeId = params.get('themeid') || null;
      this.lessonId = params.get('lessonid');
  
      // Fetch the lessons based on themeId
      this.fetchLessonsByThemeId(this.themeId);
  
      // Check if there are lessons and navigate to the first lesson by default
      if (this.LessonList && this.LessonList.length > 0) {
        const firstLessonId = this.LessonList[0].id;
        this.navigateToLesson(firstLessonId);
      }
    });
  
    this.fetchMatiereById();
    this.fetchThemeById();
  
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

  fetchMatiereById(){
    this.MatiereService.getMatiereById(this.matiereId).subscribe(
      (data)=>{
        this.Matiere = data;
      },(error)=> catchError(error)
    )
  }

  fetchThemeById(){
    this.themeService.getThemeById(this.themeId).subscribe(
      (data)=>{
        this.Theme = data
      },(error)=>catchError(error)
    )
  }
}
