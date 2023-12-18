import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  
  Students:User[];
  constructor(private userService:UsersService){

    
  }

  ngOnInit(): void {
    this.getStudents();

  }


  getStudents() {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.Students = users;
        console.log(this.Students);
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }
}
