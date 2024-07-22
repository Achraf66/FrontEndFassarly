import { AfterViewInit, Component,HostListener,OnDestroy } from '@angular/core';
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './modules/auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnDestroy,AfterViewInit{
  title = 'Fassarlt-FrontEnd';
  accesstoken:any;
  isLoginoradmin : any;
  numtelUserConnected:string | null;
  
   constructor (
    private router: Router,
    private cookieService:CookieService,
    private auth:AuthService
  ) {
    }


    ngAfterViewInit(): void {
      
      this.accesstoken = sessionStorage.getItem('accesstoken');
      if(this.accesstoken){
        const decodedToken: any = jwtDecode(this.accesstoken);
        const userId = decodedToken.sub;
        this.numtelUserConnected = userId
      }
    }

  shouldShowHeader() {
    const currentRoute = this.router.url;
    return !['/auth/login', '/auth/register','/auth/smsVerification'].includes(currentRoute) && !currentRoute.startsWith('/admin/');
  }
  
  shouldShowFooter() {
    return this.shouldShowHeader();
  }


  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    // $event.preventDefault();
    // $event.returnValue = ''; // This line is necessary for the prompt to be shown to the user
    // alert("Browser is being closed");
    // this.auth.logout(this.numtelUserConnected);
  }

  ngOnDestroy(): void {
  };


}
