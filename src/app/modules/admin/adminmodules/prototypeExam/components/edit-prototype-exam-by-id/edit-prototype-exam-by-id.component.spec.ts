import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrototypeExamByIdComponent } from './edit-prototype-exam-by-id.component';

describe('EditPrototypeExamByIdComponent', () => {
  let component: EditPrototypeExamByIdComponent;
  let fixture: ComponentFixture<EditPrototypeExamByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPrototypeExamByIdComponent]
    });
    fixture = TestBed.createComponent(EditPrototypeExamByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
