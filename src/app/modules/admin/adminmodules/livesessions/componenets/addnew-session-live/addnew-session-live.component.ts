import { Component, OnInit } from '@angular/core';
import { LivesessionService } from '../../services/livesession.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeanceEnLigne } from '../../models/SeanceEnLigne';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MenuService } from '../../../users/services/MenuService';

@Component({
  selector: 'app-addnew-session-live',
  templateUrl: './addnew-session-live.component.html',
  styleUrls: ['./addnew-session-live.component.css']
})
export class AddnewSessionLiveComponent implements OnInit {
  matiereid;
  homeWorkFile:any
  SessionForm: FormGroup

  constructor(private liveSession:LivesessionService,
    private fb:FormBuilder,private config:DynamicDialogConfig,private datepipe:DatePipe,
    private messageService:MessageService,
    private menu:MenuService,private ref:DynamicDialogRef
    
    ){

    this.matiereid = this.config.data.matiereid;

  }

  ngOnInit(): void {
    this.SessionForm = this.fb.group({
      date: ['', Validators.required],
      heureDebutHours: ['00'],
      heureDebutMinutes: ['00'],
      heureFinHours: ['00'],
      heureFinMinutes: ['00'],
      titre: ['', Validators.required],
      lienZoom: ['', Validators.required],
      heureFinCombined: [''],
      heureDebutCombined: ['']
    });

    if (this.SessionForm) {
      this.SessionForm.get('heureFinHours')?.valueChanges.subscribe(() => {
        this.combineHeureFin();
      });

      this.SessionForm.get('heureFinMinutes')?.valueChanges.subscribe(() => {
        this.combineHeureFin();
      });

      this.SessionForm.get('heureDebutHours')?.valueChanges.subscribe(() => {
        this.combineHeuredebut();
      });

      this.SessionForm.get('heureDebutMinutes')?.valueChanges.subscribe(() => {
        this.combineHeuredebut();
      });
    }
  }

  
  combineHeureFin() {
    if (this.SessionForm) {
      const hours = this.SessionForm.get('heureFinHours')?.value;
      const minutes = this.SessionForm.get('heureFinMinutes')?.value;
  
      if (hours !== null && minutes !== null) {
        const combinedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        this.SessionForm.patchValue({ heureFinCombined: combinedTime });
      }
    }
  }

  combineHeuredebut() {
    if (this.SessionForm) {
      const hours = this.SessionForm.get('heureDebutHours')?.value;
      const minutes = this.SessionForm.get('heureDebutMinutes')?.value;
  
      if (hours !== null && minutes !== null) {
        const combinedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        this.SessionForm.patchValue({ heureDebutCombined: combinedTime });
      }
    }
  }
  

  OnSubmit() {
    // Create an instance of the SeanceEnLigne class
    const seanceEnLigne: SeanceEnLigne = new SeanceEnLigne();
  
    // Get the date from the form control
    const dateFromForm = this.SessionForm.value.date;
  
    // Add 60 minutes to the date
    const dateWithAddedMinutes = new Date(dateFromForm);
    dateWithAddedMinutes.setMinutes(dateWithAddedMinutes.getMinutes() + 60);
  
    // Use DatePipe to format the date and adjust for timezone
    const formattedDate = this.datepipe.transform(dateWithAddedMinutes, 'yyyy-MM-ddTHH:mm:ss', 'UTC');
  
    // Assign adjusted date and other values to the SeanceEnLigne object
    seanceEnLigne.date = formattedDate;
    seanceEnLigne.heureDebut = this.SessionForm.value.heureDebutCombined;
    seanceEnLigne.heureFin = this.SessionForm.value.heureFinCombined;
    seanceEnLigne.titre = this.SessionForm.value.titre;
    seanceEnLigne.lienZoom = this.SessionForm.value.lienZoom;
  
    // Call the service method with the created SeanceEnLigne object
    this.liveSession.createSeanceEnLigneAndAffectToMatiere(this.matiereid, seanceEnLigne,this.homeWorkFile).subscribe(
      (data:any) => {
        if(data.message === 'SeanceEnLigne créée avec succès'){
          this.messageService.add({
            severity: 'success',
            summary: ' تم إضافة الحصة بنجاح ',
            detail: 'تم إضافة الحصة بنجاح ',
            life: 3000
        });
          this.closeModalAndNotify();
        }
        else{
          this.messageService.add({
            severity: 'error',
            summary: ' خطاء ',
            detail: 'خطاء ',
            life: 3000
        });
        }
      },(error)=>{
        this.messageService.add({
          severity: 'error',
          summary: ' خطاء ',
          detail: 'خطاء ',
          life: 3000
      });
      }
    );
  }
   
  closeModalAndNotify() {
    this.ref.close()
    this.menu.triggerNewItemAdded();
  }
  
  onFileSelectedhomeWorkFile(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.homeWorkFile = file;
    };
    reader.readAsDataURL(file);
  }


}

