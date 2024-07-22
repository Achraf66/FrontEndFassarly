import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStudentsByClasseComponent } from './all-students-by-classe.component';

describe('AllStudentsByClasseComponent', () => {
  let component: AllStudentsByClasseComponent;
  let fixture: ComponentFixture<AllStudentsByClasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllStudentsByClasseComponent]
    });
    fixture = TestBed.createComponent(AllStudentsByClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
