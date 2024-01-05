import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionliveByMatiereComponent } from './sessionlive-by-matiere.component';

describe('SessionliveByMatiereComponent', () => {
  let component: SessionliveByMatiereComponent;
  let fixture: ComponentFixture<SessionliveByMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionliveByMatiereComponent]
    });
    fixture = TestBed.createComponent(SessionliveByMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
