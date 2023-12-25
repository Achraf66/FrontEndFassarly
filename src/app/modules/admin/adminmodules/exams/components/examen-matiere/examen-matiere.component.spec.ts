import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenMatiereComponent } from './examen-matiere.component';

describe('ExamenMatiereComponent', () => {
  let component: ExamenMatiereComponent;
  let fixture: ComponentFixture<ExamenMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamenMatiereComponent]
    });
    fixture = TestBed.createComponent(ExamenMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
