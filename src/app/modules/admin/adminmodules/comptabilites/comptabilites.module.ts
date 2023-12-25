import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComptabilitesRoutingModule } from './comptabilites-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ComptabilitesRoutingModule,
    HttpClientModule
  ]
})
export class ComptabilitesModule { }
