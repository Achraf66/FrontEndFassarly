import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllthemesComponent } from './allthemes.component';

describe('AllthemesComponent', () => {
  let component: AllthemesComponent;
  let fixture: ComponentFixture<AllthemesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllthemesComponent]
    });
    fixture = TestBed.createComponent(AllthemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
