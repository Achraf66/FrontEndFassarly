import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './adminmodules/users/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { AdmindashComponent } from './admindash/admindash.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { GetallmatieresComponent } from './adminmodules/matieres/components/getallmatieres/getallmatieres.component';
import { ComptabiliteuserComponent } from './adminmodules/users/comptabiliteuser/comptabiliteuser.component';

@NgModule({
  declarations: [
    UsersComponent,
    AdmindashComponent,
    AdminheaderComponent,GetallmatieresComponent, ComptabiliteuserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    TableModule,ButtonModule,FormsModule,MenubarModule,DialogModule
  ],
  providers: [DialogService]

})
export class AdminModule { }
