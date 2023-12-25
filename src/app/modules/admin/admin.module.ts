import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './adminmodules/users/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { AdmindashComponent } from './admindash/admindash.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { GetallmatieresComponent } from './adminmodules/matieres/components/getallmatieres/getallmatieres.component';
import { ComptabiliteuserComponent } from './adminmodules/users/componenets/comptabiliteuser/comptabiliteuser.component';
import { CreateComptabiliteUserMatiereComponent } from './adminmodules/users/componenets/create-comptabilite-user-matiere/create-comptabilite-user-matiere.component';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { ComptabiliteModifyComponent } from './adminmodules/users/componenets/comptabilite-modify/comptabilite-modify.component';

@NgModule({
  declarations: [
    UsersComponent,
    AdmindashComponent,
    AdminheaderComponent,GetallmatieresComponent, ComptabiliteuserComponent, CreateComptabiliteUserMatiereComponent, ComptabiliteModifyComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    TableModule,ButtonModule,FormsModule,
    MenubarModule,DialogModule,ReactiveFormsModule,
    ListboxModule,DropdownModule,ToastModule,ImageModule
  ],
  providers: [DialogService,MessageService]

})
export class AdminModule { }
