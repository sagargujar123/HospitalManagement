import { Component, OnInit } from '@angular/core';
import { ViewComponent } from '../../../../shared/components/view/view.component';
import { ActivatedRoute } from '@angular/router';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { ToasterService } from '../../../../core/services/toaster.service';
import { DoctorsService } from '../../doctors.service';
import { DoctorResponse } from '../../../../../shared/models/doctor.model';
import { Patient } from '../../../../../shared/models/patient.model';
import { StatusStyleUtil } from '../../../../../shared/models/statusStyleUtil.model';
import { AppointmentsService } from '../../../appointments/appointments.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [ViewComponent, ConfirmDialogComponent],
  templateUrl: './doctor-detail.component.html',
  styleUrl: './doctor-detail.component.css'
})
export class DoctorDetailComponent implements OnInit {
  doctorId: number = 0;
  doctorResponse: any = {};
  patientList: Patient[] = [];

  selectedPatient: any = {};
  showModal = false;

  statusList: any[] = ['Scheduled', 'Completed', 'Cancelled', 'Pending'];

  fields: any = [
    { key: 'fullName', label: 'Full Name', row: 1, colSpan: 1, groupLabel: 'Doctor', },
    { key: 'specialization', label: 'Specialization', row: 1, colSpan: 1, groupLabel: 'Doctor', },
    { key: 'contactNumber', label: 'Contact Number', row: 1, colSpan: 1, groupLabel: 'Doctor', },
    { key: 'email', label: 'Email Address', row: 1, colSpan: 2, groupLabel: 'Doctor', }
  ];

  // Table columns definition
  columns: any = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'dateOfBirth', label: 'Date of Birth', pipeType: 'dateAge' },
    { key: 'gender', label: 'Gender' },
    { key: 'contactNumber', label: 'Contact Number' },
    { key: 'address', label: 'Address' },
    { key: 'appointmentDate', label: 'Appointment Date', pipeType: 'dateTime' },
    { key: 'status', label: 'Status', cellClass: (value: string) => StatusStyleUtil.getStatusClass(value) }
  ];

  doctorUiConfig: HeaderConfig = HeaderDefaults.doctorHeader;

  constructor(private doctorService: DoctorsService,
    private appointmentService: AppointmentsService,
    private route: ActivatedRoute,
    private toaster: ToasterService) { }

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.params['id'];
    if (this.doctorId && this.doctorId > 0) {
      this.getPatientsByDoctorId(this.doctorId);
    }
  }

  getDoctor(doctorId: number) {
    this.doctorService.getDoctorById(doctorId).subscribe({
      next: (response: DoctorResponse) => {
        this.doctorResponse = response.data;
        this.toaster.success(response.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching doctor:', error);
      }
    });
  }

  getPatientsByDoctorId(doctorId: number) {
    this.doctorService.getPatientsByDoctorId(doctorId).subscribe({
      next: (response) => {
        this.toaster.success(response.message);
        const responseData = response.data;
        this.doctorResponse = {
          fullName: responseData.fullName,
          specialization: responseData.specialization,
          contactNumber: responseData.contactNumber,
          email: responseData.email,
        };
        this.patientList = responseData.patients || [];
      }
      , error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching patients:', error);
      }
    });
  }

  onEditClicked(patient: any) {
    this.selectedPatient = {
      'AppointmentId': patient.appointmentId,
      'Patient Name': patient.fullName,
      'Appointment Date': new Date(patient.appointmentDate).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      'Current Status': patient.status
    };
    this.showModal = true;
  }

  updateAppointmentStatus(appointmentId: number, status: string) {
    this.appointmentService.updateAppointmentStatus(appointmentId, status).subscribe({
      next: (response) => {
        this.toaster.success(response.message);
        this.getPatientsByDoctorId(this.doctorId);
      }
      , error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error updating appointment status:', error);
      }
    });
  }

  updateStatus(event: any) {
    this.updateAppointmentStatus(event.AppointmentId, event.status);
    this.showModal = false;
  }

}
