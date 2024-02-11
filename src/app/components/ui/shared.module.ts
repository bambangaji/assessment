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
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import other external components

@NgModule({
  declarations: [
    ModalComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    SidebarComponent,
    FooterComponent,
    // Declare other external components
  ],
  imports: [CommonModule,FontAwesomeModule,    RouterModule.forRoot([]),ReactiveFormsModule ],
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
    MatIconModule,
    SidebarComponent,
    LoadingSpinnerComponent,
    FooterComponent
    // Export other external components
  ],
})
export class SharedModule {}
