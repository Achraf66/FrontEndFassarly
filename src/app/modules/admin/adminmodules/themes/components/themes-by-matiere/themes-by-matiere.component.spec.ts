import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesByMatiereComponent } from './themes-by-matiere.component';

describe('ThemesByMatiereComponent', () => {
  let component: ThemesByMatiereComponent;
  let fixture: ComponentFixture<ThemesByMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemesByMatiereComponent]
    });
    fixture = TestBed.createComponent(ThemesByMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
