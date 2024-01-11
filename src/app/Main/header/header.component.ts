import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/modules/admin/adminmodules/users/models/User';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { EditUserDetailsStudentComponent } from 'src/app/modules/matieres/modals/edit-user-details-student/edit-user-details-student.component';
import { Matiere } from 'src/app/modules/matieres/models/Matiere';
import { MatiereService } from 'src/app/modules/matieres/services/matiere.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  User:User
  matieres:Matiere[]
  numtel:any
  isAdmin :boolean = false
  isAuthenticated:any
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
    private dialogService: DialogService,private authService:AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/auth/login' && event.url !== '/auth/register') {
          this.numtel = this.authService.getUserId(); 
          if (this.numtel) {
            this.fetchUserByNumtel(this.numtel);
            this.fetchMatierebyUser(this.numtel);
            this.isAuthenticated = this.authService.isAuthenticated()
          }
        }
      }
    });
  }
  


logout() {
  this.auth.logout(this.numtel).subscribe(
    (data)=> {
        console.log(data)
        console.log(this.numtel)
      if (data.errormessage === 'User Already logged out') {
          this.auth.setUserId(null);
          localStorage.clear()
        
                
          Swal.fire({
            icon: 'info',
            title: 'تنبيه',
            text: 'المستخدم قد قام بتسجيل الخروج بالفعل.'
          });
        
      }
      
      if (data.successmessage === 'User logged Successfully') {
        this.auth.setUserId(null);
        localStorage.clear()

        Swal.fire({
          icon: 'success',
          title: 'نجاح',
          text: 'تم تسجيل الخروج بنجاح.'
        });
        
      }
    
      if (data.successmessage === 'User not found') {
        this.auth.setUserId(null);
        localStorage.clear()
         Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'المستخدم غير موجود.'
        });
      }
    },

    (error) => console.log(error)
  
  )
  this.auth.setUserId('');
  localStorage.setItem('accesstoken', ''); 
  this.router.navigate(['/auth/login']); 
}

EditAppUserByIdComponent(): void {
this.dialogService.open(EditUserDetailsStudentComponent, {
    header: 'البيانات الشخصية',
    width: '50%',
    height: '90%',
    dismissableMask:true,
    data: {
      idUser: this.User.id
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
      this.checkAdminRole();
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

@HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.isMobileMenuOpen = window.innerWidth <= 1000; 
}

}
