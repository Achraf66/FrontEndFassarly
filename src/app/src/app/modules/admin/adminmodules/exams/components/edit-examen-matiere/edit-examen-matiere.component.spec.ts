import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamenMatiereComponent } from './edit-examen-matiere.component';

describe('EditExamenMatiereComponent', () => {
  let component: EditExamenMatiereComponent;
  let fixture: ComponentFixture<EditExamenMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditExamenMatiereComponent]
    });
    fixture = TestBed.createComponent(EditExamenMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
