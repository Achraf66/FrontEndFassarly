import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditOfferComponent } from './create-edit-offer.component';

describe('CreateEditOfferComponent', () => {
  let component: CreateEditOfferComponent;
  let fixture: ComponentFixture<CreateEditOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditOfferComponent]
    });
    fixture = TestBed.createComponent(CreateEditOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
