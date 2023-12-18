import { Component, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fassarlt-FrontEnd';

  isLoginoradmin : any;
   constructor (private zone: NgZone, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/auth/login' || event.url ==='/auth/register'|| event.url.startsWith('/admin/')) {
          this.isLoginoradmin= true;
        } else {
          this.isLoginoradmin= false;
        }
      }
    });
  }

  accesstoken = localStorage.getItem('accesstoken');

}
