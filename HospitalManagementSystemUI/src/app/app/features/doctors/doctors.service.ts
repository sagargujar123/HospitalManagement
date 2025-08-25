import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Doctor } from '../../../shared/models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private baseUrl = environment.apiUrl + '/Doctors'; // Replace with your actual API URL
  constructor(private http: HttpClient) { }

  getAllDoctorList(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  getDoctors(page: number, size: number): Observable<Doctor[]> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', size.toString());
    return this.http.get<Doctor[]>(`${this.baseUrl}`, { params });
  }

  getDoctorById(doctorId: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/${doctorId}`);
  }

  createDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.baseUrl, doctor);
  }

  updateDoctor(doctorId: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}/${doctorId}`, doctor);
  }

  deleteDoctor(doctorId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${doctorId}`);
  }
}
