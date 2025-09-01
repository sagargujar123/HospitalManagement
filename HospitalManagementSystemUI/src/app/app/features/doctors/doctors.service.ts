import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Doctor, DoctorResponse } from '../../../shared/models/doctor.model';
import { ListItems } from '../../../shared/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private baseUrl = environment.apiUrl + '/Doctors'; // Replace with your actual API URL
  constructor(private http: HttpClient) { }

  getAllDoctorList(): Observable<ListItems> {
    return this.http.get<ListItems>(this.baseUrl);
  }

  getDoctors(page: number, size: number): Observable<ListItems> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', size.toString());
    return this.http.get<ListItems>(`${this.baseUrl}`, { params });
  }

  getDoctorById(doctorId: number): Observable<DoctorResponse> {
    return this.http.get<DoctorResponse>(`${this.baseUrl}/${doctorId}`);
  }

  createDoctor(doctor: Doctor): Observable<DoctorResponse> {
    return this.http.post<DoctorResponse>(this.baseUrl, doctor);
  }

  updateDoctor(doctorId: number, doctor: Doctor): Observable<DoctorResponse> {
    return this.http.put<DoctorResponse>(`${this.baseUrl}/${doctorId}`, doctor);
  }

  deleteDoctor(doctorId: number): Observable<DoctorResponse> {
    return this.http.delete<DoctorResponse>(`${this.baseUrl}/${doctorId}`);
  }
}
