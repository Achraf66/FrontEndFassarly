import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
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
  Examen: Examen;
  videoUrl: any;
  videoid: any;

  constructor(
    public config: DynamicDialogConfig,
    private examenService: ExamenService,
    private sanitizer: DomSanitizer
  ) {
    this.examenId = this.config.data.examenId;
  }

  ngOnInit(): void {
    this.fetchExamenById(this.examenId);
  }

  fetchExamenById(examenId: number) {
    this.examenService.fetchExamenById(examenId).subscribe(
      (data) => {
        this.Examen = data;
        console.log(this.Examen?.videoLien);

        // Move the videoUrl construction here
        this.videoid = this.Examen?.videoLien;
        this.videoUrl = `https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Ffassarly%2Fvideos%2F${this.videoid}%2F&show_text=false&width=560&t=0`;

        // Use bypassSecurityTrustIframe instead of bypassSecurityTrustResourceUrl
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

