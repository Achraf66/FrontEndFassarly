import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Page404Component } from './ExtraPages/page404/page404.component';
import { HeaderComponent } from './Main/header/header.component';
import { FooterComponent } from './Main/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent, 
    Page404Component, HeaderComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
