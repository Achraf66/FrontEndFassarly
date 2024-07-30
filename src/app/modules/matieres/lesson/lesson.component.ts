import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LessonService } from '../../admin/adminmodules/lessons/services/lesson.service';
import { Lesson } from '../../admin/adminmodules/lessons/Lesson';
import { MatiereService } from '../services/matiere.service';
import { ThemeService } from '../../admin/adminmodules/themes/services/theme.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../admin/adminmodules/users/models/User';
import { Examen } from '../../admin/adminmodules/exams/Examen';
import { Matiere } from '../models/Matiere';
import { Theme } from '../../admin/adminmodules/themes/models/Theme';
import { Observable, of, catchError, switchMap, mergeMap } from 'rxjs';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  matiereId: any;
  themeId: any;
  lessonId: any;
  LessonList: Lesson[];
  lesson: Lesson;
  Matiere: Matiere;
  Theme: Theme;
  ExamenList: Examen[];
  currentUser: User | undefined;
  isAdmin: boolean = false;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router,
    private MatiereService: MatiereService,
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.title.setTitle("فسرلي | الدرس");

    const userId = this.authService.getUserId();

    this.fetchCurrentUser(userId).pipe(
      switchMap(data => {
        this.currentUser = data;
        return this.authService.findUserBynumTel(userId);
      }),
      catchError(error => {
        return of(null);
      })
    ).subscribe(
      (data) => {
        if (data) {
          this.currentUser = data;
          this.hasRolenolivesessions();
          this.checkAdminRole();
        } else {
          // Handle user not found
        }
      },
      (error) => console.log('Error in findUserBynumTel:', error)
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.matiereId = params.get('matiereid') || null;
      this.themeId = params.get('themeid') || null;
      this.lessonId = params.get('lessonid');
      
      this.loadLessonData();
    });
  }

  loadLessonData(): void {
    this.fetchLessonsByThemeId(this.themeId);
    this.fetchLessonById(this.lessonId);
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

  fetchLessonById(lessonId: number) {
    this.lessonService.fetchLessonById(lessonId).subscribe(
      (data) => {
        this.lesson = data;
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

  fetchMatiereById() {
    this.MatiereService.getMatiereById(this.matiereId).subscribe(
      (data) => {
        this.Matiere = data;
      },
      (error) => catchError(error)
    );
  }

  fetchThemeById() {
    this.themeService.getThemeById(this.themeId).subscribe(
      (data) => {
        this.Theme = data;
      },
      (error) => catchError(error)
    );
  }

  // Fetch the current user based on userId
  private fetchCurrentUser(userId: string | null): Observable<any> {
    return this.authService.findUserBynumTel(userId).pipe(
      mergeMap((data) => {
        this.currentUser = data;
        return of(null);
      }),
      catchError((error) => {
        this.currentUser = undefined; // Set to undefined in case of an error
        return of(null);
      })
    );
  }

  // Check for silver Role
  hasRolenolivesessions(): boolean {
    const hasRole = this.currentUser?.roles?.some(role => role.name.includes('silver'));
    return hasRole || false;
  }

  checkAdminRole() {
    if (this.currentUser?.roles.some((role) => role.name.includes('admin'))) {
      this.isAdmin = true;
    }
  }
}
