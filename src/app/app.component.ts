import { Component, NgZone } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fassarlt-FrontEnd';

  isLoginoradmin : any;
   constructor (private router: Router) {
 
  }

  accesstoken = localStorage.getItem('accesstoken');

  shouldShowHeader() {
    const currentRoute = this.router.url;
    return !['/auth/login', '/auth/register','/auth/smsVerification'].includes(currentRoute) && !currentRoute.startsWith('/admin/');
  }
  
  shouldShowFooter() {
    return this.shouldShowHeader();
  }
  

}
