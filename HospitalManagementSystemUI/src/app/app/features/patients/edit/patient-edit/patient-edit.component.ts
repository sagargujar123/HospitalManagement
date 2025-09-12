import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../../../shared/components/form/form.component';
import { FormField, HeaderConfig } from '../../../../../shared/models/formfield.model';
import { PatientsService } from '../../patients.service';
import { Doctor } from '../../../../../shared/models/doctor.model';
import { DoctorsService } from '../../../doctors/doctors.service';
import { CommonModule } from '@angular/common';
import { Patient, PatientResponse } from '../../../../../shared/models/patient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../../../core/services/toaster.service';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [FormComponent, CommonModule],
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.css'
})
export class PatientEditComponent implements OnInit {
  doctorList: Doctor[] = [];
  genderList: any[] = [
    { id: 'Male', name: 'Male' },
    { id: 'Female', name: 'Female' },
  ];
  doctorListResponse: any;
  patientResponse: any;
  patientId: number = 0; // for Edit case

  fields: FormField[] = [];
  // For Edit -> provide object; For Add -> keep empty
  patient: Patient = {
    patientId: 0,
    fullName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    address: '',
    doctorId: 0
  };

  patientUiConfig: HeaderConfig = HeaderDefaults.patientHeader;

  constructor(private patientService: PatientsService,
    private doctorService: DoctorsService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.getPatientApiCall();
    this.getDoctorList();
  }

  getPatientApiCall() {
    this.patientId = this.route.snapshot.params['id'];
    if (this.patientId && this.patientId > 0) {
      this.getPatientById(this.patientId);
    }
  }

  getDoctorList() {
    this.doctorService.getAllDoctorList().subscribe((response) => {
      this.doctorListResponse = response;
      this.doctorList = this.doctorListResponse.data.items.map((doc: any) => {
        return {
          id: doc.doctorId,
          name: doc.fullName + "\u00A0\u00A0\u00A0-\u00A0\u00A0\u00A0" + doc.specialization
        };
      });
      this.formFieldMethod();
    });
  }

  formFieldMethod() {
    if (this.doctorList && this.doctorList.length > 0) {
      this.fields = [
        {
          name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter full Name', directive: 'capitalizeWord',
          validations: [
            { name: 'required', message: 'Full Name is required' },
            { name: 'minlength', value: 5, message: 'Full Name must be at least 5 characters' },
            { name: 'pattern', value: '^[A-Za-z ]+$', message: 'Only letters and spaces are allowed' }
          ]
        },
        {
          name: 'dateOfBirth', label: 'Date of Birth', type: 'date', placeholder: 'Enter Date of Birth',
          validations: [
            { name: 'required', message: 'Date Of Birth selection is required' }
          ]
        },
        {
          name: 'gender', label: 'Gender', type: 'select', options: this.genderList, placeholder: 'Select Gender',
          validations: [
            { name: 'required', message: 'Gender selection is required' }
          ]
        },
        {
          name: 'contactNumber', label: 'Contact Number', type: 'number', placeholder: 'Enter Contact Number',
          validations: [
            { name: 'required', message: 'Contact Number is required' },
            { name: 'pattern', value: '^[0-9]{10}$', message: 'Enter a valid 10-digit number' }
          ]
        },
        { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter Address' },
        {
          name: 'doctorId', label: 'Doctor', type: 'select', options: this.doctorList, placeholder: 'Select Doctor',
          validations: [
            { name: 'required', message: 'Doctor selection is required' }
          ]
        },
      ];
    }
  }

  addPatient(patient: Patient) {
    this.patientService.createPatient(patient).subscribe({
      next: (response: PatientResponse) => {
        this.toaster.success(response.message);
        setTimeout(() => {
          this.router.navigate(['/patients']);
        }, 2000);

      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error adding patient:', error);
      }
    });
  }

  getPatientById(patientId: number) {
    this.patientService.getPatientById(patientId).subscribe({
      next: (response: PatientResponse) => {
        this.patient = this.patient = {
          ...response.data,
          dateOfBirth: response.data.dateOfBirth ? response.data.dateOfBirth.split('T')[0] : ''
        };
        this.toaster.success(response.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching patient:', error.error);
      }
    });
  }

  updatePatient(patient: Patient) {
    this.patientService.updatePatient(patient.patientId, patient).subscribe({
      next: (response: PatientResponse) => {
        this.toaster.success(response.message);
        setTimeout(() => {
          this.router.navigate(['/patients']);
        }, 2000);

      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error updating patient:', error);
      }
    });
  }

  onSubmit(data: Patient) {
    if (this.patientId && this.patientId > 0) {
      this.updatePatient(data);
    } else {
      this.addPatient(data);
    }
  }

}
