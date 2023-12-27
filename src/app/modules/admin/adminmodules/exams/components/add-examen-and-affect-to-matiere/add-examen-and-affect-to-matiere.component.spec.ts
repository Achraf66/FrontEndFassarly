import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamenAndAffectToMatiereComponent } from './add-examen-and-affect-to-matiere.component';

describe('AddExamenAndAffectToMatiereComponent', () => {
  let component: AddExamenAndAffectToMatiereComponent;
  let fixture: ComponentFixture<AddExamenAndAffectToMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExamenAndAffectToMatiereComponent]
    });
    fixture = TestBed.createComponent(AddExamenAndAffectToMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
