import { Patient } from './patient.model';

export interface Doctor {
  doctorId: number;
  fullName: string;
  specialization: string;
  contactNumber: string;
  email?: string;
  patients?: Patient[];
}
