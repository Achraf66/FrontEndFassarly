import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllMessagesComponent } from './get-all-messages.component';

describe('GetAllMessagesComponent', () => {
  let component: GetAllMessagesComponent;
  let fixture: ComponentFixture<GetAllMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllMessagesComponent]
    });
    fixture = TestBed.createComponent(GetAllMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
