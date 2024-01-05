import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AddmatiereComponent } from '../adminmodules/matieres/components/addmatiere/addmatiere.component';
import { MenuService } from '../adminmodules/users/services/MenuService';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent  implements OnInit{
  items: MenuItem[] | undefined;
  visibleshowmatiere: boolean = false;
  selectedItem: any;

  constructor(private dialogService: DialogService,private menuService: MenuService){


  }




  ngOnInit() {
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
      {

          
          label: 'الرسائل',
          icon: 'pi pi-comments',
          command:(event)=>{

            this.menuService.setSelectedItem('messagesAll');
            }
      
      },
      {

          
        label: 'خروج',
        icon: 'pi pi-fw pi-power-off'
    
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


/************************Add Comptabiltie Component Modal******* */
// openModalAddComptabilite(): void {
//     const ref= this.dialogService.open(AddcomptabiliteComponent, {
//        header: 'إضافة إشتراك في مادة', 
//        width: '40%',
//        height:'60%',
//        dismissableMask: true  
//      });
   
//    }
/************************************************************** */








}
