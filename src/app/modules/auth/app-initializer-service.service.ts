import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private authService: AuthService,private cookieService:CookieService) { }

  initializeApp(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const token = this.cookieService.get('accesstoken');

      if (token) {
        const decodedToken: any = jwtDecode(token);

        // Retrieve the 'sub' claim
        const userId = decodedToken.sub;
        const exp = decodedToken.exp

        this.authService.setexpToken(exp);
        // Set the user ID in the AuthService
        this.authService.setUserId(userId);
        
      }

      resolve();
    });
  }
}

