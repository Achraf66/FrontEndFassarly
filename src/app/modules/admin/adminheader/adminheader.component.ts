import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AddmatiereComponent } from '../adminmodules/matieres/components/addmatiere/addmatiere.component';
import { MenuService } from '../adminmodules/users/services/MenuService';
import { AuthService } from '../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    private router:Router
    
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
                  icon: 'pi pi-fw pi-user-plus',
                  command: (event) => {
                    this.menuService.setSelectedItem('allUsers');
                  }
              } 
          ]
      }
      ,
      {
        label: 'الحصص المباشرة',
        icon: 'pi pi-camera', // This is the camera icon, you can change it to any live icon you prefer
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
      // {

          
      //     label: 'الرسائل',
      //     icon: 'pi pi-comments',
      //     command:(event)=>{

      //       this.menuService.setSelectedItem('messagesAll');
      //       }
      
      // },
      {

          
        label: 'خروج',
        icon: 'pi pi-fw pi-power-off',
        command: (event) => {
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









}
