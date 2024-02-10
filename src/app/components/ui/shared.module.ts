import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { HeaderComponent } from './header/header.component';
import { NgSelectModule } from '@ng-select/ng-select';  
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SidebarComponent } from './sidebar/sidebar.component';
// Import other external components

@NgModule({
  declarations: [
    ModalComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    SidebarComponent,
    // Declare other external components
  ],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ModalComponent,
    HeaderComponent,
    BrowserModule, 
    BrowserAnimationsModule,
    NgSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule, 
    SidebarComponent,
    LoadingSpinnerComponent
    // Export other external components
  ],
})
export class SharedModule {}
