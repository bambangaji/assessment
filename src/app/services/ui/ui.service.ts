import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  private sidebarStateSubject = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.sidebarStateSubject.asObservable();
  
  constructor() {}

  show(): void {
    this.isLoadingSubject.next(true);
  }

  hide(): void {
    this.isLoadingSubject.next(false);
  }

  toggleSidebar(): void {
    console.log("toggle value:"+this.sidebarStateSubject.value);
    
    this.sidebarStateSubject.next(!this.sidebarStateSubject.value);
  }
}
