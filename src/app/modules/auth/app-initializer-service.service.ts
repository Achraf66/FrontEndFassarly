import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private authService: AuthService) { }

  initializeApp(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const token = localStorage.getItem('accesstoken');

      if (token) {
        const decodedToken: any = jwtDecode(token);

        // Retrieve the 'sub' claim
        const userId = decodedToken.sub;

        // Set the user ID in the AuthService
        this.authService.setUserId(userId);
      }

      resolve();
    });
  }
}

