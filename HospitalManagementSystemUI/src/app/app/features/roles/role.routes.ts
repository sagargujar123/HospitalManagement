import { Routes } from '@angular/router';

export const ROLE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./list/role-list/role-list.component').then(c => c.RoleListComponent)
    },
    {
        path: 'add',
        loadComponent: () =>
            import('./edit/role-edit/role-edit.component').then(c => c.RoleEditComponent)
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./detail/role-detail/role-detail.component').then(c => c.RoleDetailComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./edit/role-edit/role-edit.component').then(c => c.RoleEditComponent)
    },
    {
        path: 'add/permission',
        loadComponent: () =>
            import('./edit/permission-edit/permission-edit.component').then(c => c.PermissionEditComponent)
    },
    {
        path: 'edit/permission/:id',
        loadComponent: () =>
            import('./edit/permission-edit/permission-edit.component').then(c => c.PermissionEditComponent)
    },
];
