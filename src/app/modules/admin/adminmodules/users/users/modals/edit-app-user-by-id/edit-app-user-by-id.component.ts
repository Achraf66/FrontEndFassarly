import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import {  DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '../../../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/modules/auth/services/role.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenuService } from '../../../services/MenuService';

@Component({
  selector: 'app-edit-app-user-by-id',
  templateUrl: './edit-app-user-by-id.component.html',
  styleUrls: ['./edit-app-user-by-id.component.css']
})
export class EditAppUserByIdComponent implements OnInit {
  idUser;
  user: User;
  UserForm: FormGroup;
  uploadedImage: File;
  visible: boolean = true;
  imagePreview: string | ArrayBuffer;
  roles:any;
  
  constructor(
    private userservice: UsersService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private roleservice:RoleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private menu:MenuService
  
  ) {
    this.idUser = this.config.data.idUser;
    this.fetchUserById(this.idUser);
   this.fetchRoles();
  }

  ngOnInit(): void {
    this.UserForm = this.fb.group({
      nomPrenom: [this.user?.nomPrenom || '', Validators.required],
      numeroTel: [this.user?.numeroTel || '', Validators.required],
      roles: [null],
      password: [''],
    });
  }

  fetchUserById(idUser: number) {
    this.userservice.fetchUserById(idUser).subscribe(
      (data) => {
        this.user = data;
        // Update form controls when user data is available
        this.UserForm.patchValue({
          nomPrenom: this.user?.nomPrenom || '',
          numeroTel: this.user?.numeroTel || '',
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    this.uploadedImage = file;
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
  }

  OnSubmit() {
    if (this.UserForm.valid) {
      const password = this.UserForm.value.password || null;
      const nomPrenom = this.UserForm.value.nomPrenom;
      const numeroTel = this.UserForm.value.numeroTel;
  
      let roleId: number | null = null;
  
      // Check if roles control is not null and has values
      if (this.UserForm.value.roles) {
        // Extract the selected role ID from the roles dropdown
        roleId = this.UserForm.value.roles.id;
      }
  
      // Confirm the action with a dialog
      this.confirmationService.confirm({
        header: 'تأكيد',
        message: 'هل أنت متأكد أنك تريد تقديم الاستمارة؟',
        acceptLabel:'نعم',
        rejectLabel:'لا',
        accept: () => {
          // User confirmed, proceed with form submission
          this.messageService.add({ severity: 'success', summary: 'تم التأكيد', detail: 'تم تقديم الاستمارة بنجاح.' });
          this.submitForm(password, nomPrenom, numeroTel, roleId);
        },
        reject: () => {
          // User rejected, do nothing or provide feedback
          this.messageService.add({ severity: 'info', summary: 'تم الرفض', detail: 'لقد رفضت العملية.' });
        },
      });
      
    }
  }
  
  private submitForm(password: string | null, nomPrenom: string, numeroTel: string, roleId: number | null): void {
    if (this.uploadedImage) {
      this.userservice
        .updateUser(this.idUser, password, nomPrenom, numeroTel, this.uploadedImage, roleId)
        .subscribe(
          (data) => {
           this.closeModalAndNotify()
          
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      this.userservice
        .updateUser(this.idUser, password, nomPrenom, numeroTel, null, roleId)
        .subscribe(
          (data) => {
            this.closeModalAndNotify()
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }
  
  
  
  


  fetchRoles(){
    this.roleservice.getAllroles().subscribe(

      data=>this.roles = data
  
     )
  }

  
  closeModalAndNotify() {

    this.menu.triggerNewItemAdded()
    this.ref.close();

  }
  
}
