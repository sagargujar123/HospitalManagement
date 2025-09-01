import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Appointment, AppointmentResponse } from '../../../shared/models/appointment.model';
import { Observable } from 'rxjs';
import { ListItems } from '../../../shared/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private baseUrl = environment.apiUrl + '/appointment';

  constructor(private http: HttpClient) { }

  getAllAppointments(page: number, size: number, status?: string): Observable<ListItems> {
    const params = {
      pageNumber: page.toString(),
      pageSize: size.toString(),
      status: status || ''
    };
    return this.http.get<ListItems>(`${this.baseUrl}`, { params });
  }

  getAppointmentById(appointmentId: number): Observable<AppointmentResponse> {
    return this.http.get<AppointmentResponse>(`${this.baseUrl}/${appointmentId}`);
  }

  createAppointment(appointment: Appointment): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(this.baseUrl, appointment);
  }

  updateAppointment(appointmentId: number, appointment: Appointment): Observable<AppointmentResponse> {
    return this.http.put<AppointmentResponse>(`${this.baseUrl}/${appointmentId}`, appointment);
  }

  deleteAppointment(appointmentId: number): Observable<AppointmentResponse> {
    return this.http.delete<AppointmentResponse>(`${this.baseUrl}/${appointmentId}`);
  }

  getAppointmentDetailById(appointmentId: number): Observable<AppointmentResponse> {
    return this.http.get<AppointmentResponse>(`${this.baseUrl}/detail/${appointmentId}`)
  }
}
