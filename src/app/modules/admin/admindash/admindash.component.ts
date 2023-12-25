import { Component, OnInit } from '@angular/core';
import { MenuService } from '../adminmodules/users/services/MenuService';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit{

  selectedItem:any;
  constructor(private menuService : MenuService,private title:Title){
    this.title.setTitle(" فسرلي | اللوحة الرئيسية");

  }

  ngOnInit(): void {
    this.menuService.selectedItem$.subscribe((selectedItem) => {
      this.selectedItem = selectedItem;
    });
  }

  
  

}
