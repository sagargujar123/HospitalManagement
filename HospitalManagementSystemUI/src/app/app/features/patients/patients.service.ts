import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Patient } from '../../../shared/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private baseUrl = environment.apiUrl + '/Patients';

  constructor(private http: HttpClient) { }

  getAllPatientList(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);  
  }

  getPatients(page: number, size: number): Observable<Patient[]> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', size.toString());
    return this.http.get<Patient[]>(this.baseUrl, { params });
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.baseUrl}`, patient);
  }

  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${id}`, patient)
  }

  deletePatient(id: number): Observable<Patient> {
    return this.http.delete<Patient>(`${this.baseUrl}/${id}`);
  }
}
