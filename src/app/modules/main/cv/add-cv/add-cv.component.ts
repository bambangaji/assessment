import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { CvModel, CvService } from 'src/app/models/cv-model/cv-model';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.scss']
})
export class AddCvComponent {
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  cvForm: FormGroup;
  dateError: boolean = false;
  maxDate: Date = new Date();
  birthDate: string = '';
  selectedValue?: string;
  constructor(private router: Router, private cvService: CvService, private fb: FormBuilder) {
    this.cvForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      skill: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)
    });
  }
  isDatePickerVisible = false;
  openPicker(): void {
    this.picker.open();
  }
  toggleDatePicker(): void {
    this.isDatePickerVisible = !this.isDatePickerVisible;
  }
  cancelAddEmployee(): void {
    this.router.navigate(['/main']);
  }
  onSubmit(): void {
    console.log(this.cvForm);
    if (this.cvForm.valid) {
      const formValues = this.cvForm.value;

      // Convert to JSON string
      const formValuesJSON = JSON.stringify(formValues);

      // Log the JSON string
      console.log(formValuesJSON)
      // Perform your action, such as submitting form data
      this.cvService.saveCvModel(formValuesJSON).subscribe(data => {
        console.log(data);
        this.router.navigate(['/main/cv']);
      })

    } else {
      // Form is invalid, display error messages
      console.log('Form has errors. Please fix them.');
      // You can also mark all form controls as touched to display error messages
      this.cvForm.markAllAsTouched();
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
    'Angular',
    'Javascript',
    'Dart',
    'Ionic',
    'Flutter',
    'DotNet',
  ];

  validateDateFormat(event: any): void {
    const selectedDate = event.value;
    const formattedDate = this.formatDate(selectedDate);
    this.cvForm.get('birthDate')?.setValue(formattedDate);
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
}
