import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDetailsStudentComponent } from './edit-user-details-student.component';

describe('EditUserDetailsStudentComponent', () => {
  let component: EditUserDetailsStudentComponent;
  let fixture: ComponentFixture<EditUserDetailsStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserDetailsStudentComponent]
    });
    fixture = TestBed.createComponent(EditUserDetailsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
