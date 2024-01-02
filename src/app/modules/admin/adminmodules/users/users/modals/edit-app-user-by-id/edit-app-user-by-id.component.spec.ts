import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppUserByIdComponent } from './edit-app-user-by-id.component';

describe('EditAppUserByIdComponent', () => {
  let component: EditAppUserByIdComponent;
  let fixture: ComponentFixture<EditAppUserByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAppUserByIdComponent]
    });
    fixture = TestBed.createComponent(EditAppUserByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
