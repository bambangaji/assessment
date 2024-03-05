import { Component } from '@angular/core';
import { EmployeeModel, EmployeeService } from 'src/app/models/user/employee-model';
import { RoutingService } from 'src/app/services/routing/routing.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  employeeData?: EmployeeModel;
  constructor(private employeeService: EmployeeService, private routing: RoutingService) {
    this.employeeData = this.employeeService.Employee
  }

  ngOnInit() {
  }
  toList() {
    this.routing.goToEmployee();
  }
}
