import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AddmatiereComponent } from '../adminmodules/matieres/components/addmatiere/addmatiere.component';
import { MenuService } from '../adminmodules/users/services/MenuService';
import { AuthService } from '../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent  implements OnInit{
  items: MenuItem[] | undefined;
  visibleshowmatiere: boolean = false;
  selectedItem: any;
  numtel:any
  constructor(private dialogService: DialogService,
    private menuService: MenuService,
    private auth:AuthService,
    private router:Router,
    private confirmationService: ConfirmationService,
    private cookieService:CookieService
    
    ){

    

  }
  redirectToMatierePage(): void {
    this.router.navigate(['/matieres/matieres']);
  }
   

  ngOnInit() {

    this.numtel = this.auth.getUserId(); 

    this.items = [
      
        {
        label: 'المواد',
        icon: 'pi pi-book',
        items:[

        {
            label: 'إضافة مادة جديدة',
            icon: 'pi pi-plus',
            command:(event)=>{

              this.menuService.setSelectedItem('allMatiere');  
              this.openModalAddMatiere()
            }
        },
        {
          label: 'كل المواد',
          icon: 'pi pi-list',
          command: (event) => {
            this.menuService.setSelectedItem('allMatiere');
          }
        },

        ]
        },
        {
          label: 'التلاميذ',
          icon: 'pi pi-fw pi-user',
          items: [
              {
                  label: 'كل التلاميذ',
                  icon: 'pi pi-fw pi-user',
                  command: (event) => {
                    this.menuService.setSelectedItem('allUsers');
                  }
              },
              {
                label: 'تلاميذ السنة السابعة',
                icon: 'pi pi-fw pi-user',
                command: (event) => {
                  this.menuService.setSelectedItem('allUsers7eme');
                }
              },
              {
                label: 'تلاميذ السنة الثامنة',
                icon: 'pi pi-fw pi-user',
                command: (event) => {
                  this.menuService.setSelectedItem('allUsers8eme');
                }
              },
              {
                label: 'تلاميذ السنة التاسعة',
                icon: 'pi pi-fw pi-user',
                command: (event) => {
                  this.menuService.setSelectedItem('allUsers9eme');
                }
              },
              {
                label: 'تلاميذ السنة الاولى ثانوي',
                icon: 'pi pi-fw pi-user',
                command: (event) => {
                  this.menuService.setSelectedItem('allUsers1ere');
                }
              },
              {
                label: 'المشرفين',
                icon: 'pi pi-fw pi-user',
                command: (event) => {
                  this.menuService.setSelectedItem('admin');
                }
              }    
          ]
      }
      ,
      {
        label: 'الحصص المباشرة',
        icon: 'pi pi-camera',
           command: (event) => {
              this.menuService.setSelectedItem('alllivesessions');
           }
      },
      {    
        label: 'العروض',
        icon: 'pi pi-dollar',
        command:(event)=>{
          this.menuService.setSelectedItem('offers');
          }
      },
      {
         
        label: 'تعطيل الحسابات',
        icon: 'pi pi-fw pi-lock',
        command: (event) => {
          this.desactivateAllAccounts()
       }
      },
      {
         
        label: 'إعادة تفعيل الحسابات',
        icon: 'pi pi-fw pi-lock-open',
        command: () => {
          this.activateAllAccounts();
       }
      },
      {
         
        label: 'خروج',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout();
       }
      }
     
    ];

 
    
    
}


/************************Add Matiere Component Modal*************/
openModalAddMatiere(): void {
 const ref= this.dialogService.open(AddmatiereComponent, {
    header: 'إضافة مادة جديدة', 
    width: '40%',
    height:'60%',
    dismissableMask: true
  });
}
/****************************************************************/


logout() {
  this.auth.logout(this.numtel).subscribe(
    (data)=> {
        console.log(data)
        console.log(this.numtel)
      if (data.errormessage === 'User Already logged out') {
          this.auth.setUserId(null);
          this.cookieService.deleteAll();
        
                
          Swal.fire({
            icon: 'info',
            title: 'تنبيه',
            text: 'المستخدم قد قام بتسجيل الخروج بالفعل.'
          });
        
      }
      
      if (data.successmessage === 'User logged Successfully') {
        this.auth.setUserId(null);
        this.cookieService.deleteAll();

        Swal.fire({
          icon: 'success',
          title: 'نجاح',
          text: 'تم تسجيل الخروج بنجاح.'
        });
        
      }
    
      if (data.successmessage === 'User not found') {
        this.auth.setUserId(null);
        this.cookieService.deleteAll();
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
  this.cookieService.deleteAll();
  this.router.navigate(['/auth/login']); 
}


desactivateAllAccounts() {
  this.confirmationService.confirm({
    message: 'هل أنت متأكد أنك تريد إلغاء تنشيط جميع الحسابات؟',
    header: 'تأكيد',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      // User confirmed the action
      this.auth.desactivateAllaccounts().subscribe(
        (data) => {
          if (data.successmessage === 'Users deactivated successfully') {
            Swal.fire({
              title: 'نجاح!',
              text: 'تم إلغاء تنشيط المستخدمين بنجاح.',
              icon: 'success',
              confirmButtonText: 'حسنًا'
            });
          } else if (data.errormessage === 'error has occured') {
            Swal.fire({
              title: 'خطأ!',
              text: 'حدث خطأ أثناء إلغاء تنشيط المستخدمين.',
              icon: 'error',
              confirmButtonText: 'حسنًا'
            });
          }
        },
        (error) => {
          Swal.fire({
            title: 'خطأ!',
            text: 'حدث خطأ أثناء معالجة طلبك.',
            icon: 'error',
            confirmButtonText: 'حسنًا'
          });
        }
      );
    },
    reject: () => {
      // User rejected the action
      Swal.fire({
        title: 'ملغي',
        text: 'تم إلغاء العملية.',
        icon: 'info',
        confirmButtonText: 'حسنًا'
      });
    }
  });
}


activateAllAccounts() {
  this.confirmationService.confirm({
    message: 'هل أنت متأكد أنك تريد تنشيط جميع الحسابات؟',
    header: 'تأكيد',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      // User confirmed the action
      this.auth.activateAllaccounts().subscribe(
        (data) => {
          if (data.successmessage === 'Users activated successfully') {
            Swal.fire({
              title: 'نجاح!',
              text: 'تم تنشيط المستخدمين بنجاح.',
              icon: 'success',
              confirmButtonText: 'حسنًا'
            });
          } else if (data.errormessage === 'error has occured') {
            Swal.fire({
              title: 'خطأ!',
              text: 'حدث خطأ أثناء إلغاء تنشيط المستخدمين.',
              icon: 'error',
              confirmButtonText: 'حسنًا'
            });
          }
        },
        (error) => {
          Swal.fire({
            title: 'خطأ!',
            text: 'حدث خطأ أثناء معالجة طلبك.',
            icon: 'error',
            confirmButtonText: 'حسنًا'
          });
        }
      );
    },
    reject: () => {
      // User rejected the action
      Swal.fire({
        title: 'ملغي',
        text: 'تم إلغاء العملية.',
        icon: 'info',
        confirmButtonText: 'حسنًا'
      });
    }
  });
}




}
