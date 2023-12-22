import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcomptabiliteComponent } from './addcomptabilite.component';

describe('AddcomptabiliteComponent', () => {
  let component: AddcomptabiliteComponent;
  let fixture: ComponentFixture<AddcomptabiliteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcomptabiliteComponent]
    });
    fixture = TestBed.createComponent(AddcomptabiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
