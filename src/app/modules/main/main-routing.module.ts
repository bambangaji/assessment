import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeComponent } from './employee/employee.component';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

export const routesMain: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'employee-add', component: EmployeeAddComponent },
      { path: 'employee-detail', component: EmployeeDetailComponent },
      {
        path: 'employee', component: EmployeeComponent
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Redirect to 'main' when navigating to 'employee'
    ]
  }
];
