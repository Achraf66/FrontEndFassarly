import { Component, OnInit } from '@angular/core';
import { MenuService } from '../adminmodules/users/services/MenuService';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit{

  selectedItem:any;
  constructor(private menuService : MenuService){

  }

  ngOnInit(): void {
    this.menuService.selectedItem$.subscribe((selectedItem) => {
      this.selectedItem = selectedItem;
    });
  }

  
  

}
