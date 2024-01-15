import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypeExamDetailsComponent } from './prototype-exam-details.component';

describe('PrototypeExamDetailsComponent', () => {
  let component: PrototypeExamDetailsComponent;
  let fixture: ComponentFixture<PrototypeExamDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrototypeExamDetailsComponent]
    });
    fixture = TestBed.createComponent(PrototypeExamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
