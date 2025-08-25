import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../../../shared/models/user.model';
import { ListItems, Success } from '../../../shared/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.apiUrl + '/user';

  constructor(private http: HttpClient) { }

  getUsers(page: number, size: number): Observable<ListItems> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', size.toString());
    return this.http.get<ListItems>(`${this.baseUrl}`, { params });
  }

  getUserById(userId: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/${userId}`);
  }

  createUser(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.baseUrl, user);
  }

  updateUser(userId: number, user: User): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.baseUrl}/${userId}`, user);
  }

  deleteUser(userId: number): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${this.baseUrl}/${userId}`);
  }
}
