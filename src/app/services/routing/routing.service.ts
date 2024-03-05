import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }
  goToAddEmployee() {
    this.router.navigate(['/main/employee-add']);
  }
  goToEditEmployee() {
    this.router.navigate(['/main/employee-add'], { queryParams: { isEdit: true } });
  }
  goToDetailEmployee() {
    this.router.navigate(['/main/employee-detail']);
  }
  goToEmployee() {
    this.router.navigate(['/main/employee']);
  }
}
