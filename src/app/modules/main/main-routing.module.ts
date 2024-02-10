import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';

export const routesMain: Routes = [
    { 
      path: '', 
      component: MainComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'profile', component: ProfileComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Redirect to 'main' when navigating to 'employee'
      ]
    }
];
