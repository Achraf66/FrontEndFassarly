import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivelessonService {

  private activeLessonIdSubject = new BehaviorSubject<number | null>(null);

  setActiveLessonId(lessonId: number): void {
    this.activeLessonIdSubject.next(lessonId);
  }

  getActiveLessonId(): Observable<number | null> {
    return this.activeLessonIdSubject.asObservable();
  }
}
