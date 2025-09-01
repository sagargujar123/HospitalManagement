import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Patient, PatientResponse } from '../../../shared/models/patient.model';
import { ListItems } from '../../../shared/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private baseUrl = environment.apiUrl + '/Patients';

  constructor(private http: HttpClient) { }

  getAllPatientList(): Observable<ListItems> {
    return this.http.get<ListItems>(this.baseUrl);  
  }

  getPatients(page: number, size: number): Observable<ListItems> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', size.toString());
    return this.http.get<ListItems>(this.baseUrl, { params });
  }

  getPatientById(id: number): Observable<PatientResponse> {
    return this.http.get<PatientResponse>(`${this.baseUrl}/${id}`);
  }

  createPatient(patient: Patient): Observable<PatientResponse> {
    return this.http.post<PatientResponse>(`${this.baseUrl}`, patient);
  }

  updatePatient(id: number, patient: Patient): Observable<PatientResponse> {
    return this.http.put<PatientResponse>(`${this.baseUrl}/${id}`, patient)
  }

  deletePatient(id: number): Observable<PatientResponse> {
    return this.http.delete<PatientResponse>(`${this.baseUrl}/${id}`);
  }
}
