import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { EditExamenMatiereComponent } from './src/app/modules/admin/adminmodules/exams/components/edit-examen-matiere/edit-examen-matiere.component';
import { AppInitializerService } from './modules/auth/app-initializer-service.service';

@NgModule({
  declarations: [
    AppComponent, 
    Page404Component, HeaderComponent, FooterComponent, EditExamenMatiereComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ],
    providers: [
      AppInitializerService,
      {
        provide: APP_INITIALIZER,
        useFactory: (appInitializerService: AppInitializerService) => () => appInitializerService.initializeApp(),
        deps: [AppInitializerService],
        multi: true
      },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
