import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatieresRoutingModule } from './matieres-routing.module';
import { AddmatiereComponent } from './addmatiere/addmatiere.component';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddmatiereComponent
  ],
  imports: [
    CommonModule,
    MatieresRoutingModule
    ,DialogModule
    ,FileUploadModule
    ,HttpClientModule
    ,ReactiveFormsModule
  ]
})
export class MatieresModule { }
