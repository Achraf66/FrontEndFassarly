import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferService } from '../../service/offer.service';
import { Offer } from '../../models/Offer';
import { catchError } from 'rxjs';
import { MenuService } from '../../../users/services/MenuService';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-edit-offer',
  templateUrl: './create-edit-offer.component.html',
  styleUrls: ['./create-edit-offer.component.css']
})
export class CreateEditOfferComponent implements OnInit {

  EditOffer: FormGroup;
  Offer: Offer;

  constructor(private fb: FormBuilder,
     private offerService: OfferService,
     private menu:MenuService,
     private ref:DynamicDialogRef,
     ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchOfferById();
  }

  fetchOfferById() {
    this.offerService.getOfferById(1).subscribe(
      (data) => {
        this.Offer = data;
        this.patchFormValues();
      },
      (error) => {
        catchError(error);
      }
    );
  }

  initializeForm() {
    this.EditOffer = this.fb.group({
      id: [null],
      recordMonth: [0, Validators.required],
      recordRestOfYear: [0, Validators.required],
      recordYear: [0, Validators.required],
      
      liveMonth: [0, Validators.required],
      liveRestOfYear: [0, Validators.required],
      liveYear: [0, Validators.required]
    });
  }

  patchFormValues() {
    this.EditOffer.patchValue({
      id: this.Offer.id,
      recordMonth: this.Offer.recordMonth || 0,
      recordRestOfYear: this.Offer.recordRestOfYear || 0,
      recordYear: this.Offer.recordYear || 0,
      liveMonth: this.Offer.liveMonth || 0,
      liveRestOfYear: this.Offer.liveRestOfYear || 0,
      liveYear: this.Offer.liveYear || 0
    });
  }

  OnSubmit() {
    this.offerService.createOrUpdateOffer(this.EditOffer.value).subscribe(
      (data) => {
        this.closeModalAndNotify();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  

  closeModalAndNotify() {
    this.ref.close();
    this.menu.triggerNewItemAdded();
  }
}