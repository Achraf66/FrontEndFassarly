import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/modules/admin/adminmodules/users/models/User';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { EditUserDetailsStudentComponent } from 'src/app/modules/matieres/modals/edit-user-details-student/edit-user-details-student.component';
import { Matiere } from 'src/app/modules/matieres/models/Matiere';
import { MatiereService } from 'src/app/modules/matieres/services/matiere.service';

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
  constructor(
    private matiereService: MatiereService,
    private auth: AuthService,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.numtel = this.auth.getUserId();
    this.fetchUserByNumtel(this.numtel);
    this.fetchMatierebyUser(this.numtel);

    
  }
  


logout() {
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
    console.log(this.User);
    this.isAdmin = true;
  }
}


}
