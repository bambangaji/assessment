import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './modules/main/main.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/main/dashboard/dashboard.component';
import { ProfileComponent } from './modules/main/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from './components/ui/shared.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas  }  from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from './modules/main/settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './modules/main/employee/employee.component';
import { EmployeeDetailComponent } from './modules/main/employee/employee-detail/employee-detail.component';
import { EmployeeAddComponent } from './modules/main/employee/employee-add/employee-add.component';
import { PipesModule } from './components/pipes/pipes.module';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    SettingsComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    EmployeeAddComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule, 
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIconPacks(fas);
  }
}
