import {  Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { Examen } from 'src/app/modules/admin/adminmodules/exams/Examen';
import { ExamenService } from 'src/app/modules/admin/adminmodules/exams/service/examen.service';

@Component({
  selector: 'app-correction-video-modal',
  templateUrl: './correction-video-modal.component.html',
  styleUrls: ['./correction-video-modal.component.css']
})
export class CorrectionVideoModalComponent implements OnInit {
  safeVideoUrl: any;
  examenId: any;
  Examen$: Observable<Examen>;
  videoLink: string;

  constructor(
    public config: DynamicDialogConfig,
    private examenService: ExamenService,
  ) {
    this.examenId = this.config.data.examenId;
  }

  ngOnInit(): void {
    this.fetchExamenById(this.examenId);
  }

  fetchExamenById(examenId: number) {
    this.Examen$ = this.examenService.fetchExamenById(examenId);
    this.Examen$.subscribe(
      (data) => {
        this.videoLink = data.videoLien;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

