import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError } from 'rxjs';
import { Offer } from 'src/app/modules/admin/adminmodules/Offers/models/Offer';
import { OfferService } from 'src/app/modules/admin/adminmodules/Offers/service/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit{

  Offer: Offer = { id: 0, mensuelle: 0, trimestrielle: 0, anuelle: 0 };

  constructor(private offerService:OfferService,private titleService:Title){
    this.fetchOfferById();


  }

  ngOnInit(): void {

    this.titleService.setTitle("فسرلي | عروضنا" )

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

}
