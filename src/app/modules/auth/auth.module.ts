import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';

import {  InputGroupModule } from 'primeng/inputgroup';
import {  InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { SmsVerificationComponent } from './sms-verification/sms-verification.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CookieService } from 'ngx-cookie-service';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SmsVerificationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DropdownModule,
    InputGroupAddonModule,
    InputGroupModule,
    PasswordModule,
    InputTextModule,
    ProgressSpinnerModule,
    ButtonModule,
    MessagesModule
  ],
  providers:[
    CookieService,MessageService
  ]

})
export class AuthModule { }
