import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matiere } from '../../Models/Matiere';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { MatiereService } from '../../services/matiere.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-matiere',
  templateUrl: './modify-matiere.component.html',
  styleUrls: ['./modify-matiere.component.css']
})
export class ModifyMatiereComponent implements OnInit {
  matiereForm: FormGroup;
  matiere: Matiere;
  matiereid:number
  uploadedImage: File;
  imagePreview: string | ArrayBuffer; 
  baseImageUrl:any
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, // Use DynamicDialogConfig
    private fb: FormBuilder,
    private MatiereService:MatiereService
  ) {
    // Access the matiere data from config
    this.matiere = this.config.data.matiere;
    this.matiereid = this.config.data.matiereid;
  }

  ngOnInit(): void {
    this.baseImageUrl = `${environment.fassarlyBaseUrl}/images/matiereimage`;

    this.createForm();
  }

  private createForm(): void {
    this.matiereForm = this.fb.group({
      nomMatiere: [this.matiere.nomMatiere, Validators.required],
      file:[""]
    });
  }

  saveChanges(): void {
    if (this.matiereForm.valid) {
      this.MatiereService.ModifyMatiere(this.matiereid, this.matiereForm.value.nomMatiere, this.uploadedImage).subscribe(
        (data) => {
          Swal.fire({
            title: 'تم تعديل المادة بنجاح',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.ref.close();
        },
        (error) => {
          Swal.fire({
            title: 'حدث خطأ أثناء تعديل المادة',
            icon: 'error',
            showConfirmButton: true,
          });
        }
      );
    }
  }
  

  cancel(): void {
    this.ref.close();
  }

  onFileSelected(event : any) {
    const file: File = event.target.files[0];
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);

    this.uploadedImage = file
    reader.onload = (e: any) => {
      this.imagePreview =  e.target.result;
    };

  }
}

