import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypeExamByExamComponent } from './prototype-exam-by-exam.component';

describe('PrototypeExamByExamComponent', () => {
  let component: PrototypeExamByExamComponent;
  let fixture: ComponentFixture<PrototypeExamByExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrototypeExamByExamComponent]
    });
    fixture = TestBed.createComponent(PrototypeExamByExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
