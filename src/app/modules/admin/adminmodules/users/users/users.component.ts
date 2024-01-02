import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UsersService } from '../services/users.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ComptabiliteuserComponent } from '../componenets/comptabiliteuser/comptabiliteuser.component';
import { EditAppUserByIdComponent } from './modals/edit-app-user-by-id/edit-app-user-by-id.component';
import { MenuService } from '../services/MenuService';
import { environment } from 'src/environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

 
  Students:User[];
  searchTerm: string = '';
  searchForm: FormGroup;
  sortField: any
  sortOrder: number = 1; // 1 for ascending, -1 for descending

  baseImageUrl = `${environment.fassarlyBaseUrl}/images/userimage`;

  constructor(private userService:UsersService,private dialogService:DialogService ,private menu:MenuService,
    private confirmationService: ConfirmationService,private messageService: MessageService,private fb:FormBuilder

  
    
    ){

    
  }

  ngOnInit(): void {
    this.getStudents();
    this.menu.newItemAdded$.subscribe(() => {
      this.getStudents();

    });

    this.searchForm = this.fb.group({
      searchTerm: ['']
    });

  }


  getStudents() {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.Students = users;
        console.log(this.Students);
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }


   openModalComptabilite(idUser:number,nomPrenom:string,numtel:string): void {
    const ref = this.dialogService.open(ComptabiliteuserComponent, {
      header: 'المحاسبات',
      width: '90%',
      height: '90%',
      dismissableMask:true,
      data: {
        idUser: idUser,
        nomPrenom:nomPrenom,
        numtel:numtel
            },
    });
  
    ref.onClose.subscribe((idUser:number) => {

    });
  }

  EditAppUserByIdComponent(idUser:number): void {
    const ref = this.dialogService.open(EditAppUserByIdComponent, {
      header: 'تعديل بيانات المستخدم',
      width: '50%',
      height: '90%',
      dismissableMask:true,
      data: {
        idUser: idUser
            },
    });
    ref.onClose.subscribe((idUser:number) => {

    });
  }





  deleteUserById(idUser: number): void {
    this.confirmationService.confirm({
      header: 'تأكيد الحذف',
      message: 'هل أنت متأكد أنك تريد حذف المستخدم؟',
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      accept: () => {
        this.userService.deleteUserById(idUser).subscribe(
          (data: any) => {
            if (data.message === 'Utilisateur supprimé avec succès') {
              this.messageService.add({
                severity: 'success',
                summary: 'تم الحذف',
                detail: 'تم حذف المستخدم بنجاح.'
              });
              this.getStudents();
            }
          },
          (error) => {
            console.error('Error deleting user:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: 'حدث خطأ أثناء حذف المستخدم.'
            });
          }
        );
      },
      reject: () => {
        // User rejected the deletion
        this.messageService.add({
          severity: 'info',
          summary: 'تم الإلغاء',
          detail: 'تم إلغاء عملية الحذف.'
        });
      }
    });
  }
  


  onSearch(): void {
    this.userService.searchUsers(this.searchTerm).subscribe(
      (results) => {
        this.Students = results;
      },
      (error) => {
        console.error('Error searching users:', error);
      }
    );
  }
  




}
