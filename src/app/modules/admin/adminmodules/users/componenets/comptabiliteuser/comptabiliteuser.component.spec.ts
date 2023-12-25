import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptabiliteuserComponent } from './comptabiliteuser.component';

describe('ComptabiliteuserComponent', () => {
  let component: ComptabiliteuserComponent;
  let fixture: ComponentFixture<ComptabiliteuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComptabiliteuserComponent]
    });
    fixture = TestBed.createComponent(ComptabiliteuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
