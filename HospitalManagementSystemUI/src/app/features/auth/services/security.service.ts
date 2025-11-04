import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private baseUrl = environment.apiUrl + '/Permission/Permissions';
  constructor(private http: HttpClient) { }

  private rolePermissions: any = {};
  private columnPermissions: any[] = [];

  setPermissions(roleWithPermission: any) {
    if (roleWithPermission) {

      this.rolePermissions = {
        canAdd: roleWithPermission.canAdd,
        canEdit: roleWithPermission.canEdit,
        canDelete: roleWithPermission.canDelete,
        canView: roleWithPermission.canView
      };

      this.columnPermissions = roleWithPermission.permissions || [];
    }

    console.log("Role-level permissions:", this.rolePermissions);
    console.log("Column-level permissions:", this.columnPermissions);
  }

  // Method for column-level and role-level permission checking
  can(entity: string, column: any, action: 'canView' | 'canAdd' | 'canEdit' | 'canDelete' | 'isVisible'): boolean {
    if (action === 'isVisible') {
      const perm = this.columnPermissions.find(p =>
        p.entityName === entity && p.columnName === column
      );

      return perm ? perm.isVisible : false;

    } else {
      return this.rolePermissions[action] === true;
    }
  }

  refreshPermissions(roleId: any) {
    return this.http.get<any>(`${this.baseUrl}/${roleId}`).subscribe({
      next: (response) => {
        if (response?.data) {
          this.setPermissions(response.data);
        }
      },
      error: (err) => {
        console.error("Error refreshing permissions:", err);
      }
    });
  }
}
