import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../patients.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../../../core/services/toaster.service';
import { Patient } from '../../../../../shared/models/patient.model';
import { ViewComponent } from '../../../../shared/components/view/view.component';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.css'
})
export class PatientDetailComponent implements OnInit {
  patientId: number = 0;
  patientResponse: any = {};
  fields: any = [
    { key: 'fullName', label: 'Full Name', groupLabel: 'Patient' },
    { key: 'dateOfBirth', label: 'Date of Birth', groupLabel: 'Patient', pipe: 'dateAge' },
    { key: 'gender', label: 'Gender', groupLabel: 'Patient' },
    { key: 'contactNumber', label: 'Contact Number', groupLabel: 'Patient' },
    { key: 'address', label: 'Address', groupLabel: 'Patient' }
  ]

  patientUiConfig: HeaderConfig = HeaderDefaults.patientHeader;

  constructor(private patientService: PatientsService,
    private route: ActivatedRoute,
    private toaster: ToasterService) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['id'];
    if (this.patientId && this.patientId > 0) {
      this.getPatient(this.patientId);
    }
  }

  getPatient(patientId: number) {
    this.patientService.getPatientById(patientId).subscribe({
      next: (response) => {
        const patient: any = response;
        this.toaster.success(patient.message);
        this.patientResponse = patient.data as Patient;
        console.log('Patient response:', response);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching patient:', error);
      }
    });
  }
}
