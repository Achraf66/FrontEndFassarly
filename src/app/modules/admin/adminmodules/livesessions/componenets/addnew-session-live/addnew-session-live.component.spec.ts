import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewSessionLiveComponent } from './addnew-session-live.component';

describe('AddnewSessionLiveComponent', () => {
  let component: AddnewSessionLiveComponent;
  let fixture: ComponentFixture<AddnewSessionLiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewSessionLiveComponent]
    });
    fixture = TestBed.createComponent(AddnewSessionLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
