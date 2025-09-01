export interface Patient {
  patientId: number;
  fullName: string;
  dateOfBirth: string; // ISO
  gender: string;
  contactNumber: string;
  address?: string;
  doctorId?: number | null;
  isDeleted?: boolean;
}

export interface PatientResponse {
  statusCode: number;
  message: string;
  data: Patient;
}

export interface mappedPatient {
  id: number;
  name: string;
}