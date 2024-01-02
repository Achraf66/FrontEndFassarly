import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsByThemeComponent } from './lessons-by-theme.component';

describe('LessonsByThemeComponent', () => {
  let component: LessonsByThemeComponent;
  let fixture: ComponentFixture<LessonsByThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonsByThemeComponent]
    });
    fixture = TestBed.createComponent(LessonsByThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
