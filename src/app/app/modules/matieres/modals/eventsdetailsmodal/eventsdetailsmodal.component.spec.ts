import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsdetailsmodalComponent } from './eventsdetailsmodal.component';

describe('EventsdetailsmodalComponent', () => {
  let component: EventsdetailsmodalComponent;
  let fixture: ComponentFixture<EventsdetailsmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsdetailsmodalComponent]
    });
    fixture = TestBed.createComponent(EventsdetailsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
