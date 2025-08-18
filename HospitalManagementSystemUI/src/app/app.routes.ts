import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'patients', pathMatch: 'full' },

    {
        path: 'patients',
        loadChildren: () =>
            import('./app/features/patients/patient.routes').then(m => m.PATIENT_ROUTES)
    },
    {
        path: 'doctors',
        loadChildren: () =>
            import('./app/features/doctors/doctor.routes').then(m => m.PATIENT_ROUTES)
    },
    {
        path: 'appointments',
        loadChildren: () =>
            import('./app/features/appointments/appointment.routes').then(m => m.PATIENT_ROUTES)
    },
    {
        path: 'users',
        loadChildren: () =>
            import('./app/features/users/user.routes').then(m => m.USER_ROUTES)
    },
    { path: '**', redirectTo: 'patients' }
];
