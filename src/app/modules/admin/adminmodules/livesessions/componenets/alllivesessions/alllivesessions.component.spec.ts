import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlllivesessionsComponent } from './alllivesessions.component';

describe('AlllivesessionsComponent', () => {
  let component: AlllivesessionsComponent;
  let fixture: ComponentFixture<AlllivesessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlllivesessionsComponent]
    });
    fixture = TestBed.createComponent(AlllivesessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
