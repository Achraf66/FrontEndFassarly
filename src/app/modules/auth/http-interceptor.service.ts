import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedUrls = [
      '/api/v1/auth/login',
      '/api/v1/auth/register',
      '/api/v1/auth/logout',
      '/api/roles/getAllRoles',
      '/api/v1/auth/verify-sms',
      '/api/v1/auth/reSendCodeVerification'
    ];

    if (excludedUrls.some(url => req.url.includes(url))) {
      return next.handle(req);
    }

    const token = this.cookieService.get('accesstoken');

    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          Swal.fire({
            icon: 'warning',
            title: 'لقد تم تسجيل خروجك',
            text: 'قام مستخدم آخر بتسجيل الدخول إلى حسابك. لقد تم تسجيل خروجك',
          })
          .then(() => {
            this.authService.logout(this.authService.getUserId()); 
            this.router.navigate(['/auth/login']); 
          });
        }
        return throwError(error);
      })
    );
  }
}
