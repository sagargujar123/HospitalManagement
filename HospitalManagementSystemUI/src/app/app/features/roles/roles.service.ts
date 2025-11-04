import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Role, RoleResponse } from '../../../shared/models/role.model';
import { Observable } from 'rxjs';
import { ListItems } from '../../../shared/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseUrl = environment.apiUrl + '/Role';

  constructor(private http: HttpClient) { }

  getAllRoles(page: number, size: number): Observable<ListItems> {
    const params = {
      pageNumber: page.toString(),
      pageSize: size.toString(),
    };
    return this.http.get<ListItems>(`${this.baseUrl}`, { params });
  }

  getRoleById(roleId: number): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.baseUrl}/${roleId}`);
  }

  createRole(role: Role): Observable<RoleResponse> {
    return this.http.post<RoleResponse>(this.baseUrl, role);
  }

  updateRole(roleId: number, role: Role): Observable<RoleResponse> {
    return this.http.put<RoleResponse>(`${this.baseUrl}/${roleId}`, role);
  }

  deleteRole(roleId: number): Observable<RoleResponse> {
    return this.http.delete<RoleResponse>(`${this.baseUrl}/${roleId}`);
  }

  getRoleList(): Observable<RoleResponse[]> {
    return this.http.get<RoleResponse[]>(`${this.baseUrl}/list`);
  }
}
