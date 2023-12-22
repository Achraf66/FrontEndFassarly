import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Comptabilite } from '../models/Comptabilite';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-comptabiliteuser',
  templateUrl: './comptabiliteuser.component.html',
  styleUrls: ['./comptabiliteuser.component.css']
})
export class ComptabiliteuserComponent implements OnInit {

  comptabilites:Comptabilite[]=[];
  idUser:any;
  nomPrenom:any
  numtel:any
  cols: any[];
  constructor(private userservice:UsersService,public config: DynamicDialogConfig,public ref: DynamicDialogRef,
    ){

    this.idUser = this.config.data.idUser;
    this.nomPrenom = this.config.data.nomPrenom
    this.numtel = this.config.data.numtel
    
  }

  ngOnInit(): void {

    
    this.cols = [
      { field: 'المادة', header: 'المادة' },
      { field: 'المبلغ المدفوع', header: 'المبلغ المدفوع' },
      { field: 'المبلغ المتبقي', header: 'المبلغ المتبقي' },
  ];


    this.userservice.getComptabiliteByUserId(this.idUser).subscribe(
     (data)=> {
      this.comptabilites = data;
      
    });




}
}
