import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComptabilitesRoutingModule } from './comptabilites-routing.module';
import { AddcomptabiliteComponent } from './components/addcomptabilite/addcomptabilite.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AddcomptabiliteComponent
  ],
  imports: [
    CommonModule,
    ComptabilitesRoutingModule,
    HttpClientModule
  ]
})
export class ComptabilitesModule { }
