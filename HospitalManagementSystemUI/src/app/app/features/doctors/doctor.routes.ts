import { Routes } from '@angular/router';

export const DOCTOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/doctor-list/doctor-list.component').then(c => c.DoctorListComponent)
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./edit/doctor-edit/doctor-edit.component').then(c => c.DoctorEditComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/doctor-detail/doctor-detail.component').then(c => c.DoctorDetailComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./edit/doctor-edit/doctor-edit.component').then(c => c.DoctorEditComponent)
  }
];
