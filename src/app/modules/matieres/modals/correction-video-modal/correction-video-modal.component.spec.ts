import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionVideoModalComponent } from './correction-video-modal.component';

describe('CorrectionVideoModalComponent', () => {
  let component: CorrectionVideoModalComponent;
  let fixture: ComponentFixture<CorrectionVideoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrectionVideoModalComponent]
    });
    fixture = TestBed.createComponent(CorrectionVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
