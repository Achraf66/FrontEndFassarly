import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {


  private newItemAdded = new Subject<void>();

  newItemAdded$ = this.newItemAdded.asObservable();

  triggerNewItemAdded(): void {
    this.newItemAdded.next();
  }








  private selectedItemSubject = new BehaviorSubject<string>('allUsers'); // Default value is an empty string
  selectedItem$ = this.selectedItemSubject.asObservable();

  setSelectedItem(item: string) {
    this.selectedItemSubject.next(item);
  }
}
