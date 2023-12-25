import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Matiere } from '../../Models/Matiere';
import { environment } from 'src/environments/environment';
import { MatiereService } from '../../services/matiere.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ModifyMatiereComponent } from '../modify-matiere/modify-matiere.component';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ThemesByMatiereComponent } from '../../../themes/components/themes-by-matiere/themes-by-matiere.component';
import { ExamenMatiereComponent } from '../../../exams/components/examen-matiere/examen-matiere.component';

@Component({
  selector: 'app-getallmatieres',
  templateUrl: './getallmatieres.component.html',
  styleUrls: ['./getallmatieres.component.css']
})
export class GetallmatieresComponent implements OnInit, OnDestroy{
  

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
  
  modifyMatiere(matiereid: number): void {
    // Fetch the matiere data based on matiereid
    this.matiereservice.getMatiereById(matiereid).subscribe(
      (matiere: Matiere) => {
        // Open the modification dialog with the fetched matiere data
        this.openModifyMatiereDialog(matiere,matiereid);
      },
      (error) => {
        console.error('Error fetching matiere:', error);
      }
    );
  }
  
  private openModifyMatiereDialog(matiere: Matiere,matiereid:number): void {
    const ref = this.dialogService.open(ModifyMatiereComponent, {
      header: 'تغيير إسم المادة',
      width: '50%',
      data: {
        matiere: matiere,
        matiereid:matiereid,
      },
    });
  
    // Subscribe to the dialog closed event
    ref.onClose.subscribe((modifiedMatiere: Matiere) => {
      this.loadMatieres();

      if (modifiedMatiere) {
        // Handle the modified matiere data as needed
        console.log('Modified Matiere:', modifiedMatiere);
        this.loadMatieres();
        this.cdr.detectChanges
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



  public openThemesByMatiereComponenet(matiereid:number,matierenom:string): void {
     this.dialogService.open(ThemesByMatiereComponent, {
      header: 'محاور المادة',
      width: '70%',
      height: '100%',
      dismissableMask:true,
      data: {
        matiereid:matiereid,
        matierenom:matierenom
      },
    });


}


public openExamenByMatiere(matiereid:number): void {
  this.dialogService.open(ExamenMatiereComponent, {
   header: 'فروض المادة',
   width: '85%',
   height: '100%',
   dismissableMask:true,
   data: {
     matiereid:matiereid,
   },
 });

}

}
