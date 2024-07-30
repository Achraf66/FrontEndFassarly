import { AfterViewInit, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './modules/auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Fassarlt-FrontEnd';
  accesstoken: any;
  isLoginoradmin: any;
  numtelUserConnected: string | null;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private auth: AuthService
  ) { }

  ngAfterViewInit(): void {
    this.accesstoken = this.cookieService.get('accesstoken');
    if (this.accesstoken) {
      const decodedToken: any = jwtDecode(this.accesstoken);
      const userId = decodedToken.sub;
      this.numtelUserConnected = userId;
    }

    // Mark the page as loaded in sessionStorage
    sessionStorage.setItem('pageLoaded', 'true');
  }

  shouldShowHeader() {
    const currentRoute = this.router.url;
    return !['/auth/login', '/auth/register', '/auth/smsVerification'].includes(currentRoute) && !currentRoute.startsWith('/admin/');
  }

  shouldShowFooter() {
    return this.shouldShowHeader();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event): void {
    // Set flag before unload
    localStorage.setItem('unloadFlag', 'true');
    // Optionally add a confirmation message if needed
    (event as BeforeUnloadEvent).returnValue = 'Are you sure you want to leave?';
  }

  @HostListener('window:load', ['$event'])
  onPageLoad(event: Event): void {
    // Check and handle unloadFlag on page load
    const unloadFlag = localStorage.getItem('unloadFlag');
    if (unloadFlag === 'true') {
      // Reset unloadFlag
      localStorage.removeItem('unloadFlag');
      // Only perform logout if the page was not loaded by a page reload
      if (sessionStorage.getItem('pageLoaded') !== 'true') {
        this.logoutUser();
      }
    }
    // Reset pageLoaded flag
    sessionStorage.removeItem('pageLoaded');
  }

  private logoutUser(): void {
    this.auth.logout(this.numtelUserConnected);
    this.cookieService.delete('accesstoken');
  }
}
