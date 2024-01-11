import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferService } from '../../service/offer.service';
import { Offer } from '../../models/Offer';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
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
      mensuelle: [null, Validators.required],
      trimestrielle: [null, Validators.required],
      anuelle: [null, Validators.required]
    });
  }

  patchFormValues() {
    this.EditOffer.patchValue({
      id: this.Offer.id,
      mensuelle: this.Offer.mensuelle || null,
      trimestrielle: this.Offer.trimestrielle || null,
      anuelle: this.Offer.anuelle || null
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