import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadEvent } from 'primeng/fileupload';
import { MatiereService } from '../services/matiere.service';
import { Matiere } from '../Models/Matiere';

@Component({
  selector: 'app-addmatiere',
  templateUrl: './addmatiere.component.html',
  styleUrls: ['./addmatiere.component.css']
})
export class AddmatiereComponent implements OnInit {

  MatiereForm : FormGroup;
  uploadedImage: File;
  visible: boolean = true;

constructor(private fb:FormBuilder,private service:MatiereService){

  this.MatiereForm = this.fb.group({
    nomMatiere: ['', [Validators.required]],
    file:['']

  })

}
  ngOnInit(): void {
    
  }

  showDialog() {
      this.visible = true;
  }
  onUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }
  OnSubmit() {
    // const formData = new FormData();
    // formData.append('nomMatiere', this.MatiereForm.value.nomMatiere);
    
    const matiere : Matiere={
      nomMatiere:this.MatiereForm.value.nomMatiere
    }
    
  
    this.service.addmatiere(matiere,this.uploadedImage).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  

}
