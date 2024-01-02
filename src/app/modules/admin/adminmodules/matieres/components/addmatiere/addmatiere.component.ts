import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatiereService } from '../../services/matiere.service';
import Swal from 'sweetalert2';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-addmatiere',
  templateUrl: './addmatiere.component.html',
  styleUrls: ['./addmatiere.component.css']
})
export class AddmatiereComponent implements OnInit {

  MatiereForm : FormGroup;
  uploadedImage: File;
  visible: boolean = true;
  imagePreview: string | ArrayBuffer; 

constructor(private fb:FormBuilder,private service:MatiereService,public ref: DynamicDialogRef){

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
  onFileSelected(event : any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    this.uploadedImage = file
    reader.onload = (e: any) => {
      this.imagePreview =  e.target.result;
    };

  }



  OnSubmit() {
    
    this.service.addmatiere(this.MatiereForm.value.nomMatiere,this.uploadedImage).subscribe(
      (data) => {
        
        Swal.fire({
          title: 'تمت إضافة المادة بنجاح',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500 
        });

  
        this.closeModalAndNotify() ;
              

        
      },
      (error) => {
        console.log("I'm here mate");
        console.error(error);
      }
    );
  }
  
  closeModalAndNotify() {
    this.ref.close();

    this.service.notifyMatiereUpdated();
  }
}
