import { Component, OnInit } from '@angular/core';
import { FormField, HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { DoctorsService } from '../../doctors.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../../../core/services/toaster.service';
import { Doctor, DoctorResponse } from '../../../../../shared/models/doctor.model';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../../shared/components/form/form.component';

@Component({
  selector: 'app-doctor-edit',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './doctor-edit.component.html',
  styleUrl: './doctor-edit.component.css'
})
export class DoctorEditComponent implements OnInit {
  doctorId: number = 0; // for Edit case

  doctorLoadFlag: boolean = false;

  fields: FormField[] = [];
  // For Edit -> provide object; For Add -> keep empty
  doctor: Doctor = {
    doctorId: 0,
    fullName: '',
    specialization: '',
    contactNumber: '',
    email: '',
  };

  doctorUiConfig: HeaderConfig = HeaderDefaults.doctorHeader;
  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  constructor(
    private doctorService: DoctorsService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.formFieldMethod();
    this.getDoctorApiCall();
  }

  getDoctorApiCall() {
    this.doctorId = this.route.snapshot.params['id'];

    if (this.doctorId && this.doctorId > 0) {
      this.getDoctorById(this.doctorId);
    } else {
      this.doctorLoadFlag = true;
    }
  }

  formFieldMethod() {
    this.fields = [
      {
        name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter full Name', directive: 'capitalizeWord',
        validations: [
          { name: 'required', message: 'Full Name is required' },
          { name: 'minlength', value: 5, message: 'Full Name must be at least 5 characters' },
          { name: 'pattern', value: '^[A-Za-z. ]+$', message: 'Only letters and spaces are allowed' }
        ]
      },
      {
        name: 'specialization', label: 'Specialization', type: 'text', placeholder: 'Enter Specialization', directive: 'capitalizeWord',
        validations: [
          { name: 'required', message: 'Specialization is required' },
          { name: 'minlength', value: 5, message: 'Full Name must be at least 5 characters' },
          { name: 'pattern', value: '^[A-Za-z/ ]+$', message: 'Only letters and spaces are allowed' }
        ]
      },
      {
        name: 'contactNumber', label: 'Contact Number', type: 'number', placeholder: 'Enter Contact Number',
        validations: [
          { name: 'required', message: 'Contact Number is required' },
          { name: 'pattern', value: '^[0-9]{10}$', message: 'Enter a valid 10-digit number' }
        ]
      },
      {
        name: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter Email Address',
        validations: [
          { name: 'pattern', value: this.emailPattern, message: 'Enter a valid email address' }
        ]
      },
    ];
  }

  addDoctor(doctor: Doctor) {
    this.doctorService.createDoctor(doctor).subscribe({
      next: (response: DoctorResponse) => {
        this.toaster.success(response.message);
        setTimeout(() => {
          this.router.navigate(['/doctors']);
        }, 2000);

      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error adding doctor:', error);
      }
    });
  }

  getDoctorById(doctorId: number) {
    this.doctorService.getDoctorById(doctorId).subscribe({
      next: (response: DoctorResponse) => {
        this.doctor = { ...response.data };
        this.toaster.success(response.message);

        this.doctorLoadFlag = true;
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching doctor:', error.error);
      }
    });
  }

  updateDoctor(doctor: Doctor) {
    this.doctorService.updateDoctor(doctor.doctorId, doctor).subscribe({
      next: (response: DoctorResponse) => {
        this.toaster.success(response.message);
        setTimeout(() => {
          this.router.navigate(['/doctors']);
        }, 2000);

      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error updating doctor:', error);
      }
    });
  }

  onSubmit(data: Doctor) {
    if (this.doctorId && this.doctorId > 0) {
      this.updateDoctor(data);
    } else {
      this.addDoctor(data);
    }
  }
}
