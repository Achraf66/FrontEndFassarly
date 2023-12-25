import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThemeToMatiereComponent } from './add-theme-to-matiere.component';

describe('AddThemeToMatiereComponent', () => {
  let component: AddThemeToMatiereComponent;
  let fixture: ComponentFixture<AddThemeToMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddThemeToMatiereComponent]
    });
    fixture = TestBed.createComponent(AddThemeToMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
