import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatieresRoutingModule } from './matieres-routing.module';
import { AddmatiereComponent } from './components/addmatiere/addmatiere.component';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ModifyMatiereComponent } from './components/modify-matiere/modify-matiere.component';

@NgModule({
  declarations: [
    AddmatiereComponent,
    ModifyMatiereComponent
  ],
  imports: [
    CommonModule,
    MatieresRoutingModule
    ,DialogModule
    ,FileUploadModule
    ,HttpClientModule
    ,ReactiveFormsModule
    ,TableModule
  ]
})
export class MatieresModule { }
