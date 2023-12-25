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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { ComptabiliteModifyComponent } from './adminmodules/users/componenets/comptabilite-modify/comptabilite-modify.component';
import { AllthemesComponent } from './adminmodules/themes/components/allthemes/allthemes.component';
import { CardModule } from 'primeng/card';
import { ThemesByMatiereComponent } from './adminmodules/themes/components/themes-by-matiere/themes-by-matiere.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditThemeComponent } from './adminmodules/themes/components/edit-theme/edit-theme.component';
import { AddThemeToMatiereComponent } from './adminmodules/themes/components/add-theme-to-matiere/add-theme-to-matiere.component';
import { ExamenMatiereComponent } from './adminmodules/exams/components/examen-matiere/examen-matiere.component';

@NgModule({
  declarations: [
    UsersComponent,
    AdmindashComponent,
    AdminheaderComponent,GetallmatieresComponent, ComptabiliteuserComponent, CreateComptabiliteUserMatiereComponent, ComptabiliteModifyComponent,
    AllthemesComponent,ThemesByMatiereComponent, EditThemeComponent, AddThemeToMatiereComponent, ExamenMatiereComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    TableModule,ButtonModule,FormsModule,
    MenubarModule,DialogModule,ReactiveFormsModule,
    ListboxModule,DropdownModule,ToastModule,ImageModule,CardModule,ConfirmDialogModule
  ],
  providers: [DialogService,MessageService,ConfirmationService],
  exports: [AdminheaderComponent]

})
export class AdminModule { }
