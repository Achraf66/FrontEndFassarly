import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatieresRoutingModule } from './matieres-routing.module';
import { ThemesComponent } from './themes/themes.component';
import { MatieresComponent } from './matieres/matieres.component';


@NgModule({
  declarations: [
    ThemesComponent,
    MatieresComponent
  ],
  imports: [
    CommonModule,
    MatieresRoutingModule
  ]
})
export class MatieresModule { }
