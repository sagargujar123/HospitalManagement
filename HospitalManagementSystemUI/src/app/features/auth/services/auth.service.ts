import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, LoginResponse } from '../../../shared/models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private roleKey = 'role';
  private userNameKey = 'userFullName';
  private userIdKey = 'userId';

  private baseUrl = environment.apiUrl + '/Auth/login'

  constructor(private http: HttpClient) { }

  login(authData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.baseUrl, authData);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  getRole(): string {
    return localStorage.getItem(this.roleKey) || '';
  }

  setName(fullname: string): void {
    localStorage.setItem(this.userNameKey, fullname);
  }

  getName(): string {
    return localStorage.getItem(this.userNameKey) || '';
  }

  setUserId(userId:string):void{
    localStorage.setItem(this.userIdKey, userId);
  }

  getUserId(){
    return localStorage.getItem(this.userIdKey) || '';
  }

  hasRole(roles: string[]): boolean {
    const userRole = this.getRole();
    return roles.includes(userRole);
  }

  getDefaultRouteForRole(role: string): string {
    switch (role) {
      case 'Admin': return '/dashboard';
      case 'Doctor': return '/dashboard';
      case 'Patient': return '/dashboard';
      case 'User': return '/dashboard';
      default: return '/auth/login'; // fallback
    }
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
