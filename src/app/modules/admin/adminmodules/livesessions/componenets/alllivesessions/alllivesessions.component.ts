import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatiereService } from '../../../matieres/services/matiere.service';
import { Matiere } from '../../../matieres/Models/Matiere';
import Swal from 'sweetalert2';
import { SessionliveByMatiereComponent } from '../sessionlive-by-matiere/sessionlive-by-matiere.component';

@Component({
  selector: 'app-alllivesessions',
  templateUrl: './alllivesessions.component.html',
  styleUrls: ['./alllivesessions.component.css']
})
export class AlllivesessionsComponent {
  baseImageUrl = `${environment.fassarlyBaseUrl}/images/matiereimage`;
  searchTerm: string;
  matieres: Matiere[] = [];
  matiereUpdatedSubscription: Subscription;

  constructor(private matiereservice:MatiereService ,
     private dialogService:DialogService,
     private cdr: ChangeDetectorRef,
     private router:Router
     
     ){

  }
  ngOnInit(): void {
    this.loadMatieres();
    this.matiereUpdatedSubscription = this.matiereservice.matiereUpdated$.subscribe(() => {
      this.loadMatieres();
    });
    
  }

  ngOnDestroy() {
    this.matiereUpdatedSubscription.unsubscribe();
  }

    loadMatieres(): void {
      this.matiereservice.getAllMatieres().subscribe(
      (data)=>{
            this.matieres=data
          },(error)=>{
            console.log(error)
          }
          )
  }

  deleteMatiere(idmatiere: number): void {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'سيتم حذف المادة نهائيًا!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، قم بالحذف!',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.matiereservice.DeleteMatiereById(idmatiere).subscribe(
          () => {
            this.loadMatieres();
            Swal.fire({
              title: 'تم الحذف بنجاح',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            });
            
          },
          (error) => {
            console.error('Error deleting matiere:', error);
            Swal.fire({
              title: 'حدث خطأ أثناء الحذف',
              icon: 'error',
              showConfirmButton: true,
            });
          }
        );
      }
    });
  }
  

  



  SearchMatiereByNom(nomMatiere:string){
    this.matiereservice.getMatiereBynom(nomMatiere).subscribe(
      (data)=> {

        this.matieres = data

      },(error)=> {

        console.log("Matiere not found")
      }
    )

  }



  public OpenSessionLiveByMatiere(matiereid:number): void {
    this.dialogService.open(SessionliveByMatiereComponent, {
     header: 'الحصص المباشرة للمادة',
     width: '90%',
     height: '100%',
     dismissableMask:true,
     data: {
       matiereid:matiereid,
     },
   });


}



}


