import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmatiereComponent } from './addmatiere.component';

describe('AddmatiereComponent', () => {
  let component: AddmatiereComponent;
  let fixture: ComponentFixture<AddmatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddmatiereComponent]
    });
    fixture = TestBed.createComponent(AddmatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
