export interface Appointment {
  appointmentId: number;
  date: string;        // ISO
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  patientId: number;
  doctorId: number;
}
