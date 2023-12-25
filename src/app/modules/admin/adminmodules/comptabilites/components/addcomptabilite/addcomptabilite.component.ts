import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '../../../users/models/User';
import { Matiere } from 'src/app/modules/matieres/models/Matiere';

@Component({
  selector: 'app-addcomptabilite',
  templateUrl: './addcomptabilite.component.html',
  styleUrls: ['./addcomptabilite.component.css']
})
export class AddcomptabiliteComponent implements OnInit{

    FormComptabilite:FormGroup;

    ListStudents:User[] =[] // ListOfAllUsers
    ListMatiere:Matiere[] = [] //MatiereList

  constructor(private fb:FormBuilder,public ref:DynamicDialogRef){

  }

  ngOnInit(): void {
    
    this.FormComptabilite = this.fb.group({
      idUser: ['', [Validators.required]],
      idMatiere :['',[Validators.required]],
      paye :[0,[Validators.required]],
      nonPaye :[0,[Validators.required]],

    })





    
  }



}
