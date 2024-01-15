import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrototypeExamComponent } from './add-prototype-exam.component';

describe('AddPrototypeExamComponent', () => {
  let component: AddPrototypeExamComponent;
  let fixture: ComponentFixture<AddPrototypeExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPrototypeExamComponent]
    });
    fixture = TestBed.createComponent(AddPrototypeExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
