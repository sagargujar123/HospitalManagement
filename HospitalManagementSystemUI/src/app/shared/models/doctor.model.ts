import { Patient } from './patient.model';

export interface Doctor {
  doctorId: number;
  fullName: string;
  specialization: string;
  contactNumber: string;
  email?: string;
  patients?: Patient[];
  isDeleted?: boolean;
}

export interface DoctorResponse {
  statusCode: number;
  message: string;
  data: Doctor;
}

export interface mappedDoctor {
  id: number;
  name: string;
}