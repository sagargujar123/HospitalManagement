import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Appointment } from '../../../../../shared/models/appointment.model';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { AppointmentsService } from '../../appointments.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../../core/services/toaster.service';
import { pipe } from 'rxjs';
import { StatusStyleUtil } from '../../../../../shared/models/statusStyleUtil.model';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  responseItem: any;
  appointmentList: Appointment[] = [];
  // appointmentList$ = new BehaviorSubject<Appointment[]>([]);

  statusOptions: string[] = ['Scheduled', 'Completed', 'Cancelled', 'Pending'];

  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  totalPages: number = 1;

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
      next: (response) => {
        this.responseItem = response;
        console.log('Appointments response:', this.responseItem);
        this.appointmentList = [...this.responseItem.data.items];
        // const items = this.responseItem.data.items as Appointment[];
        // this.appointmentList$.next([...items]);   //  new reference

        this.pageSize = this.responseItem.data.pageSize;
        this.pageNumber = this.responseItem.data.pageNumber;
        this.totalPages = this.responseItem.data.totalPages;
        this.totalCount = this.responseItem.data.totalCount;

        this.toaster.success(this.responseItem.message);
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

  onDeleteAppointment(appointment: Appointment) {
    console.log('Delete Appointment:', appointment);
    // this.appointmentService.deleteAppointment(appointment.appointmentId).subscribe({
    //   next: (response) => {
    //     const responseData = response as any;
    //     this.toaster.success(responseData.message);
    //     this.getAllAppointments(this.pageNumber, this.pageSize);
    //   },
    //   error: (error) => {
    //     this.toaster.error(error.error.message);
    //     console.error('Error deleting appointment:', error);
    //   }
    // });
  }

}
