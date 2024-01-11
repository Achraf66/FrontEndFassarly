import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Exclude specific URLs from interception
    const excludedUrls = [
      '/api/v1/auth/login',
      '/api/v1/auth/register',
      '/api/v1/auth/logout',
      '/api/roles/getAllRoles',
      '/api/v1/auth/verify-sms'
    ];

    // Check if the request URL is in the excluded list
    if (excludedUrls.some(url => req.url.includes(url))) {
      return next.handle(req); // Do not modify the request
    }

    // Get the access token from localStorage
    const token = localStorage.getItem('accesstoken');

    // Clone the request and add the Authorization header with the token
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedReq);
  }

  
}
