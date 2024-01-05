import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivesessionService } from '../../services/livesession.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MenuService } from '../../../users/services/MenuService';
import { SeanceEnLigne } from '../../models/SeanceEnLigne';

@Component({
  selector: 'app-edit-sessions',
  templateUrl: './edit-sessions.component.html',
  styleUrls: ['./edit-sessions.component.css']
})
export class EditSessionsComponent implements OnInit {
  SessionForm: FormGroup;
  matiereid:any;
  sessionid:any;
  Session: SeanceEnLigne = new SeanceEnLigne();

  constructor(
    private LivesessionService: LivesessionService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private menu: MenuService,
    private ref: DynamicDialogRef,private datepipe:DatePipe
  ) {
  }

  ngOnInit(): void {
    this.matiereid = this.config.data.matiereid;
    this.sessionid = this.config.data.sessionid;
    this.fetchSeanceEnligneById(this.sessionid);
    this.initializeForm(); 



  }

  fetchSeanceEnligneById(sessionId: number) {
    this.LivesessionService.GetSeanceEnLigne(sessionId).subscribe(
      (data) => {
        this.Session = data;
        this.Session.titre = data.titre
        this.initializeForm();
      },
      (error) => console.log(error)
    );
  }

  initializeForm() {
    const dateFromSession = this.Session.date ? new Date(this.Session.date) : null;


    this.SessionForm = this.fb.group({
      date: [dateFromSession, Validators.required],
      titre: [this.Session.titre, Validators.required],
      lienZoom: [this.Session.lienZoom,Validators.required],
      heureFinCombined: [this.Session.heureFin,Validators.required],
      heureDebutCombined: [this.Session.heureDebut,Validators.required],
      heureDebutHours: ['00'],
      heureDebutMinutes: ['00'],
      heureFinHours: ['00'],
      heureFinMinutes: ['00']
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

    this.LivesessionService.editSeanceEnLigneById(this.sessionid, seanceEnLigne).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'نجاح',
          detail: 'تم تعديل الجلسة بنجاح!',
        });
        this.closeModalAndNotify()
        
      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'حدث خطأ أثناء تعديل الجلسة',
        });
      }
      
    );
  }
   
  closeModalAndNotify() {
    this.ref.close()
    this.menu.triggerNewItemAdded();
  }
  
}

  