import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallmatieresComponent } from './getallmatieres.component';

describe('GetallmatieresComponent', () => {
  let component: GetallmatieresComponent;
  let fixture: ComponentFixture<GetallmatieresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetallmatieresComponent]
    });
    fixture = TestBed.createComponent(GetallmatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
