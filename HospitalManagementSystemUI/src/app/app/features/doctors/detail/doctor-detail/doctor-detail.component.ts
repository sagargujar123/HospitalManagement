import { Component, OnInit } from '@angular/core';
import { ViewComponent } from '../../../../shared/components/view/view.component';
import { ActivatedRoute } from '@angular/router';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { ToasterService } from '../../../../core/services/toaster.service';
import { DoctorsService } from '../../doctors.service';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './doctor-detail.component.html',
  styleUrl: './doctor-detail.component.css'
})
export class DoctorDetailComponent implements OnInit {
  doctorId: number = 0;
  doctorResponse: any = {};
  fields: any = [
    { key: 'fullName', label: 'Full Name', groupLabel: 'Doctor' },
    { key: 'specialization', label: 'Specialization', groupLabel: 'Doctor' },
    { key: 'contactNumber', label: 'Contact Number', groupLabel: 'Doctor' },
    { key: 'email', label: 'Email Address', groupLabel: 'Doctor' }
  ]

  doctorUiConfig: HeaderConfig = HeaderDefaults.doctorHeader;

  constructor(private doctorService: DoctorsService,
    private route: ActivatedRoute,
    private toaster: ToasterService) { }

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.params['id'];
    if (this.doctorId && this.doctorId > 0) {
      this.getDoctor(this.doctorId);
    }
  }

  getDoctor(doctorId: number) {
    this.doctorService.getDoctorById(doctorId).subscribe({
      next: (response) => {
        const doctor: any = response;
        this.doctorResponse = doctor.data;
        this.toaster.success(doctor.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching doctor:', error);
      }
    });
  }
}
