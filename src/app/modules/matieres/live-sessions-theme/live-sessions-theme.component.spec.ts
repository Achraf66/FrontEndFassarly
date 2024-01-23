import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSessionsThemeComponent } from './live-sessions-theme.component';

describe('LiveSessionsThemeComponent', () => {
  let component: LiveSessionsThemeComponent;
  let fixture: ComponentFixture<LiveSessionsThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveSessionsThemeComponent]
    });
    fixture = TestBed.createComponent(LiveSessionsThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
