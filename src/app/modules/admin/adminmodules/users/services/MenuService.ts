import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private selectedItemSubject = new BehaviorSubject<string>('allUsers'); // Default value is an empty string
  selectedItem$ = this.selectedItemSubject.asObservable();

  setSelectedItem(item: string) {
    this.selectedItemSubject.next(item);
  }
}
