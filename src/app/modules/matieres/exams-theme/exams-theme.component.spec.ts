import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsThemeComponent } from './exams-theme.component';

describe('ExamsThemeComponent', () => {
  let component: ExamsThemeComponent;
  let fixture: ComponentFixture<ExamsThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsThemeComponent]
    });
    fixture = TestBed.createComponent(ExamsThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
