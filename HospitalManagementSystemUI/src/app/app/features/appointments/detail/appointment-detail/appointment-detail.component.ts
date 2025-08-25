import { Component, OnInit } from '@angular/core';
import { ViewComponent } from '../../../../shared/components/view/view.component';
import { AppointmentsService } from '../../appointments.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { ToasterService } from '../../../../core/services/toaster.service';
import { Appointment } from '../../../../../shared/models/appointment.model';
import { StatusStyleUtil } from '../../../../../shared/models/statusStyleUtil.model';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.css'
})
export class AppointmentDetailComponent implements OnInit {
  appointmentId: number = 0;
  appointmentResponse: any = {};
  // fields: any = [
  //   { key: 'appointmentDate', label: 'Appointment Date', pipe: 'dateTime' },
  //   { key: 'status', label: 'Appointment Status', cellClass: (value: string) => StatusStyleUtil.getStatusClass(value) },
  //   { key: 'patient.fullName', label: 'Patient Name', width: '200px' },
  //   { key: 'patient.gender', label: 'Gender', width: '150px' },
  //   { key: 'patient.contactNumber', label: 'Patient Contact Number', width: '200px' },
  //   { key: 'doctor.fullName', label: 'Doctor Name', width: '200px' },
  //   { key: 'doctor.specialization', label: 'Doctor Specialization', width: '200px' },
  //   { key: 'doctor.contactNumber', label: 'Doctor Contact Number', width: '200px' },
  // ]

  fields: any = [
    { key: 'appointmentDate', label: 'Appointment Date', row: 1, colSpan: 1, groupLabel: 'Appointment', pipe: 'dateTime' },
    { key: 'status', label: 'Appointment Status', row: 1, colSpan: 4, groupLabel: 'Appointment', cellClass: (value: string) => StatusStyleUtil.getStatusClass(value) },

    { key: 'patient.fullName', label: 'Patient Name', width: '200px', row: 2, colSpan: 1, groupLabel: 'Patient', },
    { key: 'patient.gender', label: 'Gender', width: '150px', row: 2, colSpan: 1, groupLabel: 'Patient', },
    { key: 'patient.contactNumber', label: 'Patient Contact Number', width: '200px', row: 2, colSpan: 3, groupLabel: 'Patient', },

    { key: 'doctor.fullName', label: 'Doctor Name', width: '200px', row: 3, colSpan: 1, groupLabel: 'Doctor', },
    { key: 'doctor.specialization', label: 'Doctor Specialization', width: '200px', row: 3, colSpan: 1, groupLabel: 'Doctor', },
    { key: 'doctor.contactNumber', label: 'Doctor Contact Number', width: '200px', row: 3, colSpan: 4, groupLabel: 'Doctor', },
  ]

  appointmentUiConfig: HeaderConfig = HeaderDefaults.appointmentHeader;

  constructor(private appointmentService: AppointmentsService,
    private route: ActivatedRoute,
    private toaster: ToasterService) { }

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.params['id'];
    if (this.appointmentId && this.appointmentId > 0) {
      this.getAppointment(this.appointmentId);
    }
  }

  getAppointment(appointmentId: number) {
    this.appointmentService.getAppointmentDetailById(appointmentId).subscribe({
      next: (response) => {
        const appointment: any = response;
        this.toaster.success(appointment.message);
        this.appointmentResponse = appointment.data as Appointment;
        console.log('Appointment response:', response);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching appointment:', error);
      }
    });
  }
}
