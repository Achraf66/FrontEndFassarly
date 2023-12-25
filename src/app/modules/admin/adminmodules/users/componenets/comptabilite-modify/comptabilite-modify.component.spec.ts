import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptabiliteModifyComponent } from './comptabilite-modify.component';

describe('ComptabiliteModifyComponent', () => {
  let component: ComptabiliteModifyComponent;
  let fixture: ComponentFixture<ComptabiliteModifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComptabiliteModifyComponent]
    });
    fixture = TestBed.createComponent(ComptabiliteModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
