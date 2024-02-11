import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCvComponent } from './cv/add-cv/add-cv.component';
import { CvComponent } from './cv/cv.component';
import { DetailCvComponent } from './cv/detail-cv/detail-cv.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
      { path: 'add-cv', component: AddCvComponent },
      { path: 'detail-cv', component: DetailCvComponent },
      {
        path: 'cv', component: CvComponent
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Redirect to 'main' when navigating to 'employee'
    ]
  }
];
