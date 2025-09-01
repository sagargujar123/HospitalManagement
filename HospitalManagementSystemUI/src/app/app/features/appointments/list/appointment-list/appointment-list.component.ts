import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Appointment, AppointmentResponse } from '../../../../../shared/models/appointment.model';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { AppointmentsService } from '../../appointments.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../../core/services/toaster.service';
import { pipe } from 'rxjs';
import { StatusStyleUtil } from '../../../../../shared/models/statusStyleUtil.model';
import { ListItems } from '../../../../../shared/models/common.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, TableComponent, ConfirmDialogComponent],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  appointmentList: Appointment[] = [];
  // appointmentList$ = new BehaviorSubject<Appointment[]>([]);

  statusOptions: string[] = ['Scheduled', 'Completed', 'Cancelled', 'Pending'];

  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  totalPages: number = 1;

  selectedAppointment: any = {};
  showModal = false;

  columns: object[] = [
    { field: 'appointmentDate', header: 'Appointment Date', width: '250px', pipeType: 'dateTime' },
    { field: 'patient.fullName', header: 'Patient Name', width: '250px' },
    { field: 'patient.gender', header: 'Gender', width: '200px' },
    { field: 'doctor.fullName', header: 'Doctor Name', width: '250px' },
    { field: 'doctor.specialization', header: 'Doctor Specialization', width: '250px' },
    { field: 'status', header: 'Status', width: '200px', cellClass: (value: string) => StatusStyleUtil.getStatusClass(value) }
  ];

  appointmentUiConfig: HeaderConfig = HeaderDefaults.appointmentHeader;

  constructor(private appointmentService: AppointmentsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService) { }

  ngOnInit() {
    this.getAllAppointments(this.pageNumber, this.pageSize);
  }

  getAllAppointments(page: number, size: number, status?: string) {
    this.appointmentService.getAllAppointments(page, size, status).subscribe({
      next: (response: ListItems) => {

        this.appointmentList = [...response.data.items];
        // const items = response.data.items as Appointment[];
        // this.appointmentList$.next([...items]);   //  new reference

        this.pageSize = response.data.pageSize;
        this.pageNumber = response.data.pageNumber;
        this.totalPages = response.data.totalPages;
        this.totalCount = response.data.totalCount;

        this.toaster.success(response.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching appointments:', error);
      }
    });
  }

  onPageChange(newPage: number) {
    this.getAllAppointments(newPage, this.pageSize);
  }

  onViewAppointment(appointment: Appointment) {
    this.router.navigate(['/appointments', appointment.appointmentId]);
  }

  onEditAppointment(appointment: Appointment) {
    this.router.navigate(['/appointments/edit', appointment.appointmentId]);
  }

  onDeleteAppointment(appointment: any) {
    this.selectedAppointment = {
      'Id': appointment.appointmentId,
      'Appointment Date': new Date(appointment.appointmentDate).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      'Patient Name': appointment.patient.fullName,
      'Gender': appointment.patient.gender,
      'Doctor Name': appointment.doctor.fullName,
      'Specialization': appointment.doctor.specialization,
      'Status': appointment.status,
    };
    this.showModal = true;
  }

  deleteAppointment(appointmentId: number) {
    this.appointmentService.deleteAppointment(appointmentId).subscribe({
      next: (response: AppointmentResponse) => {
        this.toaster.success(response.message);
        this.reloadList();
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error deleting appointment:', error);
      }
    });
    this.showModal = false;
  }

  reloadList() {
    setTimeout(() => {
      this.getAllAppointments(this.pageNumber, this.pageSize);
    }, 2000);
  }

}
