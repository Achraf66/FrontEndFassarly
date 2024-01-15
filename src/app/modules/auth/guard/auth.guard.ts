import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import  {jwtDecode} from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { User } from '../../admin/adminmodules/users/models/User';
import { MatiereService } from '../../matieres/services/matiere.service';
import { Matiere } from '../../matieres/models/Matiere';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {
  matiereId :any
  currentUser: User | undefined;
  tel:string
  Matiere: Matiere
  constructor(private authService: AuthService,
     private router: Router,
     private matiereService:MatiereService,
     private messageService: MessageService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('accesstoken');

    if (token !== null) {
      const decodedToken: any = jwtDecode(token);
      
      // Retrieve the 'sub' claim
      const userId = decodedToken.sub;
  
      // Set the user ID in the AuthService
      this.authService.setUserId(userId);
    } else {
      // Handle the case when the token is null
      console.error('Access token is null.');
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is authenticated


    if (this.authService.isAuthenticated()) {
      // Check if the user has the required roles
      const roles: string[] | null = next.data['roles'];
      const token = localStorage.getItem('accesstoken');

      if (state.url.includes('auth/login')  || (state.url.includes('auth/register'))) {
        this.messageService.add({
          severity: 'info',
          summary: 'تنبيه',
          detail: 'أنت بالفعل قد قمت بتسجيل الدخول.',
        });
        this.router.navigate(['/matieres/matieres']);
        return true; 
      }

  
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.sub;

        // Fetch the current user using the fetched userId and mergeMap
        return this.fetchCurrentUser(userId).pipe(
          mergeMap(() => {
            // Get the matiereId from the route
            const matiereId: number | null = +(next.paramMap.get('matiereid')!) || null;
            console.log(matiereId)

            // Check if the user has access to the course based on matiereId
            return this.hasAccessToCourse(this.currentUser, matiereId).pipe(
              map((hasAccess) => {
                if (this.currentUser && this.hasRequiredRoles(roles) && hasAccess) {
                  return true;
                } else {
                  // Redirect to unauthorized page if the user does not have the required roles or access to the course
                  Swal.fire({
                    icon: 'warning',
                    title: 'تنبيه',
                    text: 'أنت لست مشترك في هذه المادة',
                  });    
                  return false;
                }
              })
            );
          })
        );
      }
  
      // Redirect to login page if not authenticated
      return of(this.router.createUrlTree(['/auth/login']));
    }
  
    // Redirect to login page if not authenticated
    return of(this.router.createUrlTree(['/auth/login']));
  }
    
  
  // Fetch the current user based on userId
  private fetchCurrentUser(userId: string): Observable<any> {
    return this.authService.findUserBynumTel(userId).pipe(
      mergeMap((data) => {
        this.currentUser = data;
        return of(null);
      }),
      catchError((error) => {
        this.currentUser = undefined; // Set to undefined in case of an error
        return of(null);
      })
    );
  }
  

  private hasRequiredRoles(requiredRoles: string[] | undefined | null): boolean {
    if (!requiredRoles || requiredRoles.length === 0 || requiredRoles === undefined || requiredRoles === null) {
      // No required roles specified, allow access
      return true;
    }
  
    if (!this.currentUser || !this.currentUser.roles) {
      // User roles not available, deny access
      return false;
    }
  
    // Check if the user has at least one of the required roles
    return requiredRoles.some((requiredRole) =>
      this.currentUser?.roles.some((userRole) => userRole.name === requiredRole)
    );
  }

  
  hasAccessToCourse(user: User | undefined, matiereId: number | null): Observable<boolean> {
    if (user) {
      // Check if at least one comptabilite has the required matiereId
      const hasAccess = user.comptabilites?.some(comptabilite => {
        return comptabilite.matieres.id === matiereId;
      });
      
      if (hasAccess) {
        return of(true);
      }
    }
  
    if (matiereId == null) {
      return of(true);
    }
  
    return new Observable<boolean>((observer) => {
      console.log('Checking access for matiereId:', matiereId);
      console.log('User matiereIds:', user?.comptabilites?.flatMap(comptabilite => comptabilite.matieres?.id));
      
      this.matiereService.getMatiereById(matiereId).subscribe(
        (matiere) => {
          if (matiere) {
            const userRoles = user?.roles.map((role) => role.name);
            const userMatiereIds = user?.comptabilites?.flatMap(comptabilite => comptabilite.matieres?.id) || [];
  
            console.log('Fetched Matiere:', matiere);
            console.log('User roles:', userRoles);
  
            if (userMatiereIds.includes(matiereId) || (userRoles?.includes('admin')))
            {
              console.log('Access granted.');
              observer.next(true); 
            } else {
              console.log('Access denied - Role or Matiere condition not met.');
              observer.next(false);
            }
          } else {
            console.log('Access denied - Matiere is null.');
            observer.next(false);
          }
          observer.complete();
        },
        (error) => {
          console.log('Error fetching Matiere:', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
  
  




fetchMatiereById(matiereid:number){
  this.matiereService.getMatiereById(matiereid).subscribe(
    (data)=>{
      this.Matiere = data
    },(error)=>{
      console.log(error)
    }
  )
}

}
