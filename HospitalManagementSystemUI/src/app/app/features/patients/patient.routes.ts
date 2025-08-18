import { Routes } from '@angular/router';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/patient-list/patient-list.component').then(c => c.PatientListComponent)
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./edit/patient-edit/patient-edit.component').then(c => c.PatientEditComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/patient-detail/patient-detail.component').then(c => c.PatientDetailComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./edit/patient-edit/patient-edit.component').then(c => c.PatientEditComponent)
  }
];
