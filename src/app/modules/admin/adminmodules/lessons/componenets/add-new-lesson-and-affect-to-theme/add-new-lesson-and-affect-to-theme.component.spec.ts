import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLessonAndAffectToThemeComponent } from './add-new-lesson-and-affect-to-theme.component';

describe('AddNewLessonAndAffectToThemeComponent', () => {
  let component: AddNewLessonAndAffectToThemeComponent;
  let fixture: ComponentFixture<AddNewLessonAndAffectToThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewLessonAndAffectToThemeComponent]
    });
    fixture = TestBed.createComponent(AddNewLessonAndAffectToThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
