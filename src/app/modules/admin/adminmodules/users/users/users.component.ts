import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UsersService } from '../services/users.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ComptabiliteuserComponent } from '../comptabiliteuser/comptabiliteuser.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

 
  Students:User[];
  constructor(private userService:UsersService,private dialogService:DialogService){

    
  }

  ngOnInit(): void {
    this.getStudents();

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
      width: '70%',
      height: '70%',
      data: {
        idUser: idUser,
        nomPrenom:nomPrenom,
        numtel:numtel
            },
    });
  
    ref.onClose.subscribe((idUser:number) => {

    });
  }












}
