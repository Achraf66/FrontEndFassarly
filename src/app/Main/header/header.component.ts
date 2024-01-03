import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Matiere } from 'src/app/modules/matieres/models/Matiere';
import { MatiereService } from 'src/app/modules/matieres/services/matiere.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  matieres:Matiere[]
  numtel:any
  constructor(private matiereService:MatiereService,private auth:AuthService,private router:Router){

    this.numtel = this.auth.getUserId();
    this.fetchMatierebyUser(this.numtel);
  }






fetchMatierebyUser(numtel:string){
this.matiereService.findMatiereByUser(numtel).subscribe(
  (data)=>{
    this.matieres = data
  },(error)=>{
    console.log(error)
  }
)
}
logout() {
  this.auth.setUserId('');
  localStorage.setItem('accesstoken', ''); 
  this.router.navigate(['/auth/login']); 
}


}
