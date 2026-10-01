import { Component } from '@angular/core';
Import { Admin } from './components/admin/admin';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})

export const routes: Routes = [
  // Keep your existing routes here

  {
    path: 'admin',
    component: Admin
  }
];

export class Admin {}
