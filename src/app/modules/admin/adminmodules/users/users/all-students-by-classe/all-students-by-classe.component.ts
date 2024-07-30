import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';
import { catchError } from 'rxjs';
import { Table } from 'primeng/table';
import { EditAppUserByIdComponent } from '../modals/edit-app-user-by-id/edit-app-user-by-id.component';
import { ComptabiliteuserComponent } from '../../componenets/comptabiliteuser/comptabiliteuser.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuService } from '../../services/MenuService';

@Component({
  selector: 'app-all-students-by-classe',
  templateUrl: './all-students-by-classe.component.html',
  styleUrls: ['./all-students-by-classe.component.css']
})
export class AllStudentsByClasseComponent implements AfterViewInit,OnInit {
  
  @Input() className: string;
  
  @ViewChild('dt2') dt2: Table; 

  studentList : User[]=[];

  constructor(
    private userService:UsersService,
    private confirmationService:ConfirmationService,
    private dialogService:DialogService,
    private messageService:MessageService,
    private menu:MenuService

  ){
  }
  
  

  fetchStudentsByClass(className: string) {
    this.userService.getAllStudentsByRole(className).subscribe(
      (data: User[]) => {
        this.studentList = data;
        console.log(data)
      },
      (error) => {
        catchError(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.fetchStudentsByClass(this.className);
  }
  ngOnInit(){
    this.menu.newItemAdded$.subscribe(() => {
      this.fetchStudentsByClass(this.className);
    });
  }

  getClassNameInArabic(className: string): string {
    switch (className) {
      case '7eme':
        return 'السنة السابعة';
      case '8eme':
        return 'السنة الثامنة';
      case '9eme':
        return 'السنة التاسعة';
        case '1ere':
          return 'سنة اولى ثانوي';  
      default:
        return 'تلاميذ السنة';
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt2.filterGlobal(input.value, 'contains');
  }

  openModalComptabilite(idUser:number,nomPrenom:string,numtel:string): void {
    const ref = this.dialogService.open(ComptabiliteuserComponent, {
      header: 'المحاسبات',
      width: 'auto',
      height: 'auto',
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
              this.fetchStudentsByClass(this.className);
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


}
