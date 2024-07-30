import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/modules/admin/adminmodules/users/models/User';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { EditUserDetailsStudentComponent } from 'src/app/modules/matieres/modals/edit-user-details-student/edit-user-details-student.component';
import { Matiere } from 'src/app/modules/matieres/models/Matiere';
import { MatiereService } from 'src/app/modules/matieres/services/matiere.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  User: User | null;
  matieres: Matiere[];
  numtel: any;
  isAdmin: boolean = false;
  isAuthenticated: any;
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  constructor(
    private matiereService: MatiereService,
    private auth: AuthService,
    private router: Router,
    private dialogService: DialogService,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAuthAndFetchData();
      }
    });
  }

  ngAfterViewInit(): void {
    this.checkAuthAndFetchData();
  }

  checkAuthAndFetchData(): void {
    this.numtel = this.authService.getUserId();
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.numtel && this.isAuthenticated) {
      this.fetchUserByNumtel(this.numtel);
      if((this.User?.accountActivated === false) && (!this.isAdmin)){
        this.matieres = []
      }else{
        this.fetchMatierebyUser(this.numtel);
      }
    } else {
      this.User = null;
      this.matieres = [];
      this.isAdmin = false;
    }
  }

  logout() {
    this.auth.logout(this.numtel).subscribe(
      (data) => {
        this.handleLogoutResponse(data);
      },
      (error) => console.log(error)
    );
  }

  handleLogoutResponse(data: any) {
    this.auth.setUserId(null);
    this.cookieService.deleteAll();
    let message = 'تم تسجيل الخروج بنجاح.';
    let icon = 'success';

    if (data.errormessage === 'User Already logged out') {
      message = 'المستخدم قد قام بتسجيل الخروج بالفعل.';
      icon = 'info';
    } else if (data.successmessage === 'User not found') {
      message = 'المستخدم غير موجود.';
      icon = 'error';
    }

    let iconType: SweetAlertIcon = icon as SweetAlertIcon;

    Swal.fire({
      icon: iconType,
      title: icon === 'success' ? 'نجاح' : 'خطأ',
      text: message,
    }).then(() => {
      this.router.navigate(['/auth/login']);
    });
    
  }

  EditAppUserByIdComponent(): void {
    this.dialogService.open(EditUserDetailsStudentComponent, {
      header: 'البيانات الشخصية',
      width: 'auto',
      height: 'auto',
      dismissableMask: true,
      data: {
        idUser: this.User?.id
      },
    });
  }

  fetchUserByNumtel(numtel: string) {
    this.auth.findUserBynumTel(numtel).subscribe(
      (data) => {
        this.User = data;
        this.checkAdminRole();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchMatierebyUser(numtel: string) {
    this.matiereService.findMatiereByUser(numtel).subscribe(
      (data) => {
        this.matieres = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkAdminRole() {
    if (this.User?.roles.some((role) => role.name.includes('admin'))) {
      this.isAdmin = true;
    }
  }






  
}
