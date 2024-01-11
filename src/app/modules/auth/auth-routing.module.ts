import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SmsVerificationComponent } from './sms-verification/sms-verification.component';

const routes: Routes = [

  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'register',component:RegisterComponent,pathMatch:'full'},
  {path:'smsVerification',component:SmsVerificationComponent,pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
