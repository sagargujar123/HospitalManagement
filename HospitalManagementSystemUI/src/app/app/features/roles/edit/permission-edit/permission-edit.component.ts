import { Component, OnInit } from '@angular/core';
import { FormField, HeaderConfig } from '../../../../../shared/models/formfield.model';
import { Permission, PermissionResponse } from '../../../../../shared/models/permission.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { FormComponent } from '../../../../shared/components/form/form.component';
import { RolesService } from '../../roles.service';
import { mappedRole, RoleResponse } from '../../../../../shared/models/role.model';
import { PermissionsService } from '../../permissions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../../../core/services/toaster.service';

@Component({
  selector: 'app-permission-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './permission-edit.component.html',
  styleUrl: './permission-edit.component.css'
})
export class PermissionEditComponent implements OnInit {
  permissionId: number = 0; // for Edit case
  roleList: mappedRole[] = [];
  fields: FormField[] = [];

  permission: Permission = {
    permissionId: 0,
    entityName: '',
    columnName: '',
    isVisible: false,
    roleId: 0
  };

  permissionUiConfig: HeaderConfig = HeaderDefaults.permissionHeader;

  constructor(private roleService: RolesService,
    private permissionService: PermissionsService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.getRoleList();
    this.getPermissionApiCall();
  }

  formFieldMethod() {
    this.fields = [
      {
        name: 'entityName', label: 'Entity Name', type: 'text', placeholder: 'Enter Entity Name', directive: 'titleCase',
        validations: [
          { name: 'required', message: 'Entity Name is required' },
        ]
      },
      {
        name: 'columnName', label: 'Column Name', type: 'text', placeholder: 'Enter Column Name', directive: 'capitalizeWord',
        validations: [
          { name: 'required', message: 'Column Name is required' }
        ]
      },
      {
        name: 'roleId', label: 'Role Name', type: 'select', options: this.roleList, placeholder: 'Select Role Name',
        validations: [
          { name: 'required', message: 'Role Name selection is required' }
        ]
      },
      {
        name: 'isVisible', label: 'Allow Column Visible', type: 'checkbox',
      },
    ];
  }

  getPermissionApiCall() {
    this.permissionId = this.route.snapshot.params['id'];

    if (this.permissionId && this.permissionId > 0) {
      this.getPermissionById(this.permissionId);
    }
  }

  getRoleList() {
    this.roleService.getRoleList().subscribe({
      next: (response: any) => {
        this.roleList = response.data.map((role: any) => {
          return {
            id: role.roleId,
            name: role.roleName
          }
        });
        console.log("Role List: ", response);
        this.formFieldMethod();
      },
      error: (error) => {
        console.error("Error fetching role list: ", error);
      }
    });
  }

  addPermission(permission: Permission) {
    this.permissionService.createPermission(permission).subscribe({
      next: (response: PermissionResponse) => {
        this.toaster.success(response.message);
        setTimeout(() => {
          this.router.navigate(['/roles']);
        }, 2000);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error adding permission:', error);
      }
    });
  }

  getPermissionById(permissionId: number) {
    this.permissionService.getPermissionById(permissionId).subscribe({
      next: (response: PermissionResponse) => {

        this.permission = {
          ...response.data,
        };

        this.toaster.success(response.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching permission:', error.error);
      }
    });
  }

  updatePermission(permission: Permission) {
    this.permissionService.updatePermission(permission.permissionId, permission).subscribe({
      next: (response: PermissionResponse) => {
        this.toaster.success(response.message);
        setTimeout(() => {
          this.router.navigate(['/roles']);
        }, 2000);

      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error updating permission:', error);
      }
    });
  }

  onSubmit(data: Permission) {
    if (this.permissionId && this.permissionId > 0) {
      this.updatePermission(data);
    } else {
      this.addPermission(data);
    }
  }

}
