import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdetailsmodalComponent } from './eventdetailsmodal.component';

describe('EventdetailsmodalComponent', () => {
  let component: EventdetailsmodalComponent;
  let fixture: ComponentFixture<EventdetailsmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventdetailsmodalComponent]
    });
    fixture = TestBed.createComponent(EventdetailsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
