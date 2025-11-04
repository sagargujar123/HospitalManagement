import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListItems } from '../../../shared/models/common.model';
import { Permission, PermissionResponse } from '../../../shared/models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private baseUrl = environment.apiUrl + '/Permission';

  constructor(private http: HttpClient) { }

  getAllPermissions(page: number, size: number): Observable<ListItems> {
    const params = {
      pageNumber: page.toString(),
      pageSize: size.toString(),
    };
    return this.http.get<ListItems>(`${this.baseUrl}`, { params });
  }

  getPermissionById(permissionId: number): Observable<PermissionResponse> {
    return this.http.get<PermissionResponse>(`${this.baseUrl}/${permissionId}`);
  }

  createPermission(permission: Permission): Observable<PermissionResponse> {
    return this.http.post<PermissionResponse>(this.baseUrl, permission);
  }

  updatePermission(permissionId: number, permission: Permission): Observable<PermissionResponse> {
    return this.http.put<PermissionResponse>(`${this.baseUrl}/${permissionId}`, permission);
  }

  deletePermission(permissionId: number): Observable<PermissionResponse> {
    return this.http.delete<PermissionResponse>(`${this.baseUrl}/${permissionId}`);
  }
}
