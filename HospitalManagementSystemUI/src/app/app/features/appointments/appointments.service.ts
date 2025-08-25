import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Appointment } from '../../../shared/models/appointment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private baseUrl = environment.apiUrl + '/appointment';

  constructor(private http: HttpClient) { }

  getAllAppointments(page: number, size: number, status?: string): Observable<Appointment[]> {
    const params = {
      pageNumber: page.toString(),
      pageSize: size.toString(),
      status: status || ''
    };
    return this.http.get<Appointment[]>(`${this.baseUrl}`, { params });
  }

  getAppointmentById(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/${appointmentId}`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl, appointment);
  }

  updateAppointment(appointmentId: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.baseUrl}/${appointmentId}`, appointment);
  }

  deleteAppointment(appointmentId: number): Observable<Appointment> {
    return this.http.delete<Appointment>(`${this.baseUrl}/${appointmentId}`);
  }

  getAppointmentDetailById(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/detail/${appointmentId}`)
  }
}
