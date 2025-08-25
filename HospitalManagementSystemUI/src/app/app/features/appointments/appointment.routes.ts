import { Routes } from '@angular/router';

export const APPOINTMENT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./list/appointment-list/appointment-list.component').then(c => c.AppointmentListComponent)
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./edit/appointment-edit/appointment-edit.component').then(c => c.AppointmentEditComponent)
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./detail/appointment-detail/appointment-detail.component').then(c => c.AppointmentDetailComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./edit/appointment-edit/appointment-edit.component').then(c => c.AppointmentEditComponent)
    }
];
