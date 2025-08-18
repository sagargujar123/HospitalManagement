import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./list/user-list/user-list.component').then(c => c.UserListComponent)
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./edit/user-edit/user-edit.component').then(c => c.UserEditComponent)
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./detail/user-detail/user-detail.component').then(c => c.UserDetailComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./edit/user-edit/user-edit.component').then(c => c.UserEditComponent)
    }
]