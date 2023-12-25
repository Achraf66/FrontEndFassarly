import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComptabiliteUserMatiereComponent } from './create-comptabilite-user-matiere.component';

describe('CreateComptabiliteUserMatiereComponent', () => {
  let component: CreateComptabiliteUserMatiereComponent;
  let fixture: ComponentFixture<CreateComptabiliteUserMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComptabiliteUserMatiereComponent]
    });
    fixture = TestBed.createComponent(CreateComptabiliteUserMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
