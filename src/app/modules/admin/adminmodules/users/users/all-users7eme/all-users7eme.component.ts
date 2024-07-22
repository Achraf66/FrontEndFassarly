import { Component, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-all-users7eme',
  templateUrl: './all-users7eme.component.html',
  styleUrls: ['./all-users7eme.component.css']
})
export class AllUsers7emeComponent {
  
  @Input() className: string;

  constructor(private userService:UsersService){
    this.userService.getAllStudentsByRole(this.className).subscribe(
      data=>console.log(data)
    )
  }

}
