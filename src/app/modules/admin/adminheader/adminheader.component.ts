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

          
            label: 'المحاور',
            icon: 'pi pi-bookmark',
            items: [
                {
                    label: 'إضافة محور',
                    icon: 'pi pi-fw pi-plus',
  
                },
                {
                    label: 'جميع المحاور',
                    icon: 'pi pi-list',
                    command: (event) => {
                      this.menuService.setSelectedItem('allThemes');
                    }
  
                }, 

      
            ]
        
        },


        {

          
            label: 'الدروس',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'إضافة درس جديد',
                    icon: 'pi pi-fw pi-plus',
  
                },
                {
                    label: 'جميع الدروس',
                    icon: 'pi pi-list',
  
                }, 

      
            ]
        
        },

        {

          
          label: 'الرسائل',
          icon: 'pi pi-comments',
          items: [
              {
                  // label: 'إضافة محاسبة',
                  // icon: 'pi pi-fw pi-plus',
                  // command:(event)=>{

                  //     this.openModalAddComptabilite()
                  //   }
              }
    
          ]
      
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
