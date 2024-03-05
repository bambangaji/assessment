import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/models/user/employee-model';
import { RoutingService } from 'src/app/services/routing/routing.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  employeeForm: FormGroup;
  dateError: boolean = false;
  maxDate: Date = new Date();
  birthDate: string = '';
  selectedValue?: string;
  isEdit = false;
  constructor(private routing: RoutingService, private employeeService: EmployeeService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.employeeForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      basicSalary: new FormControl('', [Validators.required, this.basicSalaryValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
    this.route.queryParams.subscribe(params => {
      this.isEdit = params['isEdit'];
      // Do something with the received data, such as fetching employee details based on the ID
    });
    if (this.isEdit) {
      const employeeData = employeeService.Employee
      this.employeeForm.get('firstName')?.setValue(employeeData?.firstName);
      this.employeeForm.get('lastName')?.setValue(employeeData?.lastName);
      this.employeeForm.get('userName')?.setValue(employeeData?.userName);
      this.employeeForm.get('basicSalary')?.setValue(employeeData?.basicSalary);
      this.employeeForm.get('email')?.setValue(employeeData?.email);
      this.employeeForm.get('birthDate')?.setValue(employeeData?.birthDate);
      this.employeeForm.get('description')?.setValue(employeeData?.description);
      this.employeeForm.get('group')?.setValue(employeeData?.group);
      this.employeeForm.get('status')?.setValue(employeeData?.status);
    }
    console.log(this.isEdit)
  }
  isDatePickerVisible = false;
  openPicker(): void {
    this.picker.open();
  }
  toggleDatePicker(): void {
    this.isDatePickerVisible = !this.isDatePickerVisible;
  }
  onSubmit(): void {
    console.log(this.employeeForm);
    if (this.employeeForm.valid) {
      const formValues = this.employeeForm.value;

      // Convert to JSON string
      var formValuesJSON = JSON.stringify(formValues);

      // Log the JSON string
      console.log(formValuesJSON)
      // Perform your action, such as submitting form data
      if (this.isEdit) {
        this.employeeService.editEmployeeModel(formValuesJSON).subscribe(data => {
          console.log("sss")
          console.log(data);
          this.routing.goToEmployee()
        })
      } else {
        this.employeeService.saveEmployeeModel(formValuesJSON).subscribe(data => {
          console.log(data);
          this.routing.goToEmployee()
        })
      }
    } else {
      // Form is invalid, display error messages
      console.log('Form has errors. Please fix them.');
      // You can also mark all form controls as touched to display error messages
      this.employeeForm.markAllAsTouched();
    }

  }
  basicSalaryValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value === 0) {
      return { 'requiredNonZero': true };
    }
    return null;
  }
  dummyData = [
    'IT',
    'Sales',
    'HR',
    'BoD',
    'Staff',
    'Customer Service',
    'Front Office',
    'Admin',
    'Manager',
    'Event Organizer',
  ];

  validateDateFormat(event: any): void {
    const selectedDate = event.value;
    const formattedDate = this.formatDate(selectedDate);
    this.employeeForm.get('birthDate')?.setValue(formattedDate);
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  toList() {
    this.routing.goToEmployee();
  }
}
