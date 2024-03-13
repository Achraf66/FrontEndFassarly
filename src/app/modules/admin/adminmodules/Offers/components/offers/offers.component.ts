import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../service/offer.service';
import { Offer } from '../../models/Offer';
import { catchError } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateEditOfferComponent } from '../create-edit-offer/create-edit-offer.component';
import { MenuService } from '../../../users/services/MenuService';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent  implements OnInit{

  Offer: Offer = {id:0,recordMonth:0,recordRestOfYear:0,recordYear:0,liveMonth:0,liveYear:0,liveRestOfYear:0 };
  constructor(private offerService:OfferService,private dialogService:DialogService,private menu:MenuService){
    this.fetchOfferById();

  }

  ngOnInit(): void {
    this.menu.newItemAdded$.subscribe(() => {
      this.fetchOfferById();
    });
  }
  
  fetchOfferById(){
    this.offerService.getOfferById(1).subscribe(
      (data)=>{
        console.log(data)
        this.Offer = data;
      },(error)=>{
        catchError(error)
      }
    )
  }


  public OpenAddOrEditOffer(): void {
    this.dialogService.open(CreateEditOfferComponent, {
      header: 'تعديل العروض',
      width: '40%',
      height: '80%',
      dismissableMask: true,
     
    });
  }

}
