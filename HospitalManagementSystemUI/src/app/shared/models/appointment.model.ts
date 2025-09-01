export interface Appointment {
  appointmentId: number;
  appointmentDate: string;        // ISO
  status: string;
  patientId: number;
  doctorId: number;
  isDeleted?: boolean;
}

export interface AppointmentResponse {
  statusCode: number;
  message: string;
  data: Appointment;
}