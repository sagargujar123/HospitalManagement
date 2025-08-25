import { Component, OnInit } from '@angular/core';
import { FormField, HeaderConfig } from '../../../../../shared/models/formfield.model';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../../shared/components/form/form.component';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { DoctorsService } from '../../../doctors/doctors.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from '../../../../../shared/models/doctor.model';
import { ToasterService } from '../../../../core/services/toaster.service';
import { PatientsService } from '../../../patients/patients.service';
import { AppointmentsService } from '../../appointments.service';
import { Patient } from '../../../../../shared/models/patient.model';
import { Appointment } from '../../../../../shared/models/appointment.model';

@Component({
  selector: 'app-appointment-edit',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './appointment-edit.component.html',
  styleUrl: './appointment-edit.component.css'
})
export class AppointmentEditComponent implements OnInit {
  doctorList: Doctor[] = [];
  patientList: Patient[] = [];

  appointmentId: number = 0; // for Edit case

  statusList: any[] = [
    { id: 'Scheduled', name: 'Scheduled' },
    { id: 'Completed', name: 'Completed' },
    { id: 'Cancelled', name: 'Cancelled' },
    { id: 'Pending', name: 'Pending' },
  ];

  fields: FormField[] = [];
  // For Edit -> provide object; For Add -> keep empty
  appointment = {
    appointmentId: 0,
    appointmentDate: '',
    status: '',
    patientId: 0,
    doctorId: 0,
  };

  appointmentUiConfig: HeaderConfig = HeaderDefaults.appointmentHeader;

  constructor(
    private doctorService: DoctorsService,
    private patientService: PatientsService,
    private appointmentService: AppointmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.getDoctorList();
    this.getPatientList();

    this.getAppointmentApiCall();
  }

  getDoctorList() {
    this.doctorService.getAllDoctorList().subscribe((response) => {
      const doctorListResponse = response as any;
      this.doctorList = doctorListResponse.data.items.map((doc: any) => {
        return {
          id: doc.doctorId,
          name: doc.fullName
        };
      });
      console.log('Doctor List Response:', this.doctorList);
      this.formFieldMethod();
    });
  }

  getPatientList() {
    this.patientService.getAllPatientList().subscribe((response) => {
      const patientListResponse = response as any;
      this.patientList = patientListResponse.data.items.map((doc: any) => {
        return {
          id: doc.patientId,
          name: doc.fullName
        };
      });
      console.log('Patient List Response:', this.patientList);
      this.formFieldMethod();
    });
  }

  getAppointmentApiCall() {
    this.appointmentId = this.route.snapshot.params['id'];
    console.log('appointment ID from route:', this.appointmentId);
    if (this.appointmentId && this.appointmentId > 0) {
      this.getAppointmentById(this.appointmentId);
    }
  }

  formFieldMethod() {
    this.fields = [
      {
        name: 'appointmentDate', label: 'Appointment Date', type: 'date', placeholder: 'Enter Appointment Date',
        validations: [
          { name: 'required', message: 'Appointment Date is required' },
        ]
      },
      {
        name: 'status', label: 'Appointment Status', type: 'select', options: this.statusList, placeholder: 'Select Appointment Status',
        validations: [
          { name: 'required', message: 'Appointment Status selection is required' }
        ]
      },
      {
        name: 'patientId', label: 'Patient Name', type: 'select', options: this.patientList, placeholder: 'Select Patient Name',
        validations: [
          { name: 'required', message: 'Patient Name selection is required' }
        ]
      },
      {
        name: 'doctorId', label: 'Doctor Name', type: 'select', options: this.doctorList, placeholder: 'Select Doctor Name',
        validations: [
          { name: 'required', message: 'Doctor Name selection is required' }
        ]
      },
    ];
  }

  addAppointment(appointment: Appointment) {
    this.appointmentService.createAppointment(appointment).subscribe({
      next: (response) => {
        const responseItem: any = response;
        this.toaster.success(responseItem.message);
        setTimeout(() => {
          this.router.navigate(['/appointments']);
        }, 2000);

      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error adding doctor:', error);
      }
    });
  }

  getAppointmentById(appointmentId: number) {
    this.appointmentService.getAppointmentById(appointmentId).subscribe({
      next: (response) => {
        const appointmentResponse: any = response;

        this.appointment = this.appointment = {
          ...appointmentResponse.data,
          appointmentDate: appointmentResponse.data.appointmentDate ? appointmentResponse.data.appointmentDate.split('T')[0] : ''
        };

        console.log('appointment data:', this.appointment);
        this.toaster.success(appointmentResponse.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching doctor:', error.error);
      }
    });
  }

  updateAppointment(appointment: Appointment) {
    this.appointmentService.updateAppointment(appointment.appointmentId, appointment).subscribe({
      next: (response) => {
        const responseItem: any = response;
        this.toaster.success(responseItem.message);
        setTimeout(() => {
          this.router.navigate(['/appointments']);
        }, 2000);

      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error updating doctor:', error);
      }
    });
  }

  onSubmit(data: any) {
    if (this.appointmentId && this.appointmentId > 0) {
      this.updateAppointment(data);
    } else {
      this.addAppointment(data);
    }
  }
}
