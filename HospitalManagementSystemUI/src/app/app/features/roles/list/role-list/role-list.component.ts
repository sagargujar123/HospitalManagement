import { Component, OnInit } from '@angular/core';
import { ViewListComponent } from "../../../../shared/components/view-list/view-list.component";
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { RolesService } from '../../roles.service';
import { ListItems } from '../../../../../shared/models/common.model';
import { Role, RoleResponse } from '../../../../../shared/models/role.model';
import { ToasterService } from '../../../../core/services/toaster.service';
import { Permission, PermissionResponse } from '../../../../../shared/models/permission.model';
import { Router } from '@angular/router';
import { PermissionsService } from '../../permissions.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [ViewListComponent, ConfirmDialogComponent],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit {
  roleList: Role[] = [];
  roleUiConfig: HeaderConfig = HeaderDefaults.roleHeader;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  totalPages: number = 1;

  selectedPermission: any = {};
  selectedRole: any = {};

  showRoleModal = false;
  showPermissionModal = false;

  roleColumns = [
    { field: 'roleId', header: 'Role ID', width: '300px', },
    { field: 'roleName', header: 'Role Name', width: '300px' },
    { field: 'canAdd', header: 'Add', width: '200px' },
    { field: 'canEdit', header: 'Edit', width: '200px', },
    { field: 'canDelete', header: 'Delete', width: '200px', },
    { field: 'canView', header: 'View', width: '200px' },
  ];

  permissionColumns = [
    { field: 'permissionId', header: 'Permission ID', width: '200px', },
    { field: 'entityName', header: 'Entity Name', width: '300px', },
    { field: 'columnName', header: 'Column Name', width: '300px', },
    { field: 'isVisible', header: 'Column Visible', width: '300px', },
  ];

  constructor(private roleService: RolesService,
    private toaster: ToasterService,
    private router: Router,
    private permissionService: PermissionsService
  ) { }

  ngOnInit(): void {
    this.getAllRoles(this.pageNumber, this.pageSize);
  }

  getAllRoles(pageNumber: number, pageSize: number) {
    this.roleService.getAllRoles(pageNumber, pageSize).subscribe({
      next: (response: ListItems) => {
        this.roleList = [...response.data.items];

        this.pageSize = response.data.pageSize;
        this.pageNumber = response.data.pageNumber;
        this.totalPages = response.data.totalPages;
        this.totalCount = response.data.totalCount;

        this.toaster.success(response.message);
        console.log(response);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching roles:', error);
      }
    });
  }

  onEditRole(role: Role) {
    this.router.navigate(['/roles/edit', role.roleId]);
  }

  onDeleteRole(role: Role) {
    this.selectedRole = {
      'ID': role.roleId,
      'Role Name': role.roleName,
      'Can Edit': role.canEdit,
      'Can Delete': role.canDelete,
      'Can View': role.canView,
      'Role ID': role.roleId,
    };
    this.showRoleModal = true;
  }

  deleteRole(roleId: number) {
    this.roleService.deleteRole(roleId).subscribe({
      next: (response: RoleResponse) => {
        this.toaster.success(response.message);
        this.reloadList();
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error deleting permission:', error);
      }
    });
    this.showRoleModal = false;
  }

  onEditPermission(permission: Permission) {
    this.router.navigate(['/roles/edit/permission', permission.permissionId]);
  }

  onDeletePermission(permission: Permission) {
    console.log('onDeletePermission', permission);
    this.selectedPermission = {
      'ID': permission.permissionId,
      'Entity Name': permission.entityName,
      'Column Name': permission.columnName,
      'Is Visible': permission.isVisible,
    };
    this.showPermissionModal = true;
  }

  deletePermission(permissionId: number) {
    console.log('deletePermission', permissionId);
    this.permissionService.deletePermission(permissionId).subscribe({
      next: (response: PermissionResponse) => {
        this.toaster.success(response.message);
        this.reloadList();
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error deleting permission:', error);
      }
    });
    this.showPermissionModal = false;
  }

  reloadList() {
    setTimeout(() => {
      this.getAllRoles(this.pageNumber, this.pageSize);
    }, 2000);
  }

  onPageChange(newPage: number) {
    this.getAllRoles(newPage, this.pageSize);
  }

}
