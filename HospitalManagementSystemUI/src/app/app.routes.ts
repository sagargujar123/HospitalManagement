import { Routes } from '@angular/router';
import { authGuard } from './app/core/guards/auth.guard';
import { guestGuard } from './app/core/guards/guest.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
        canActivate:[guestGuard]
    },
    {
        path: 'patients',
        loadChildren: () =>
            import('./app/features/patients/patient.routes').then(m => m.PATIENT_ROUTES),
        canActivate: [authGuard],
        data: { roles: ['Admin', 'Patient'] }
    },
    {
        path: 'doctors',
        loadChildren: () =>
            import('./app/features/doctors/doctor.routes').then(m => m.DOCTOR_ROUTES),
        canActivate: [authGuard],
        data: { roles: ['Admin', 'Doctor'] }
    },
    {
        path: 'appointments',
        loadChildren: () =>
            import('./app/features/appointments/appointment.routes').then(m => m.APPOINTMENT_ROUTES),
        canActivate: [authGuard],
        data: { roles: ['Admin', 'Doctor', 'Patient'] }
    },
    {
        path: 'users',
        loadChildren: () =>
            import('./app/features/users/user.routes').then(m => m.USER_ROUTES),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];
