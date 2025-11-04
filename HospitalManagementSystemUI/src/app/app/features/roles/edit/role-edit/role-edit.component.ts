import { Component, OnInit } from '@angular/core';
import { FormField, HeaderConfig } from '../../../../../shared/models/formfield.model';
import { Role, RoleResponse } from '../../../../../shared/models/role.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../../../core/services/toaster.service';
import { RolesService } from '../../roles.service';
import { FormComponent } from '../../../../shared/components/form/form.component';

@Component({
  selector: 'app-role-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.css'
})
export class RoleEditComponent implements OnInit {
  roleId: number = 0;
  fields: FormField[] = [];
 
  role: Role = {
    roleId: 0,
    roleName: '',
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canView: false,
  };

  roleUiConfig: HeaderConfig = HeaderDefaults.roleHeader;

  constructor(
    private roleService: RolesService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.formFieldMethod();
    this.getRoleApiCall();
  }

  getRoleApiCall() {
    this.roleId = this.route.snapshot.params['id'];

    if (this.roleId && this.roleId > 0) {
      this.getRoleById(this.roleId);
    }
  }

  formFieldMethod() {
    this.fields = [
      {
        name: 'roleName', label: 'Role Name', type: 'text', placeholder: 'Enter Role Name', directive: 'titleCase',  
        validations: [
          { name: 'required', message: 'Role Name is required' },
        ]
      },
       {
        name: 'canAdd', label: 'Allow Add', type: 'checkbox',
      },
      {
        name: 'canEdit', label: 'Allow Edit', type: 'checkbox',
      },
      {
        name: 'canDelete', label: 'Allow Delete', type: 'checkbox',
      },
      {
        name: 'canView', label: 'Allow View', type: 'checkbox',
      },
    ];
  }

  addRole(role: Role) {
    this.roleService.createRole(role).subscribe({
      next: (response: RoleResponse) => {
        this.toaster.success(response.message);
        setTimeout(() => {
          this.router.navigate(['/roles']);
        }, 2000);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error adding role:', error);
      }
    });
  }

  getRoleById(roleId: number) {
    this.roleService.getRoleById(roleId).subscribe({
      next: (response: RoleResponse) => {

        this.role = this.role = {
          ...response.data,
        };

        this.toaster.success(response.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching role:', error.error);
      }
    });
  }

  updateRole(role: Role) {
    this.roleService.updateRole(role.roleId, role).subscribe({
      next: (response: RoleResponse) => {
        this.toaster.success(response.message);
        setTimeout(() => {
          this.router.navigate(['/roles']);
        }, 2000);

      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error updating role:', error);
      }
    });
  }

  onSubmit(data: Role) {
    if (this.roleId && this.roleId > 0) {
      this.updateRole(data);
    } else {
      this.addRole(data);
    }
  }

}
