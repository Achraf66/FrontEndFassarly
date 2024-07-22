import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsers7emeComponent } from './all-users7eme.component';

describe('AllUsers7emeComponent', () => {
  let component: AllUsers7emeComponent;
  let fixture: ComponentFixture<AllUsers7emeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllUsers7emeComponent]
    });
    fixture = TestBed.createComponent(AllUsers7emeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
