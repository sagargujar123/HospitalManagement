export interface Patient {
  patientId: number;
  fullName: string;
  dateOfBirth: string; // ISO
  gender: string;
  contactNumber: string;
  address?: string;
  doctorId?: number | null;
}
