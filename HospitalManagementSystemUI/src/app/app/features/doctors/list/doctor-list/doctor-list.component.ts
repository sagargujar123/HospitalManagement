import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Doctor, DoctorResponse } from '../../../../../shared/models/doctor.model';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { Router } from '@angular/router';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { ToasterService } from '../../../../core/services/toaster.service';
import { DoctorsService } from '../../doctors.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ListItems } from '../../../../../shared/models/common.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, TableComponent, ConfirmDialogComponent],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {
  responseItem: any;
  doctorList: Doctor[] = [];
  // doctorList$ = new BehaviorSubject<Doctor[]>([]);

  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  totalPages: number = 1;

  selectedDoctor: any = {};
  showModal = false;

  columns: object[] = [
    { field: 'fullName', header: 'Full Name', width: '250px' },
    { field: 'specialization', header: 'Specialization', width: '250px' },
    { field: 'contactNumber', header: 'Contact Number', width: '250px' },
    { field: 'email', header: 'Email Address', width: '300px' },
    { field: 'doctorId', header: 'View Patient', width: '300px' }
  ];

  doctorUiConfig: HeaderConfig = HeaderDefaults.doctorHeader;

  constructor(private doctorService: DoctorsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService) { }

  ngOnInit() {
    this.getAllDoctors(this.pageNumber, this.pageSize);
  }

  getAllDoctors(page: number, size: number) {
    this.doctorService.getDoctors(page, size).subscribe({
      next: (response: ListItems) => {
        this.doctorList = [...response.data.items];
        // const items = response.data.items as Doctor[];
        // this.doctorList$.next([...items]);   //  new reference

        this.pageSize = response.data.pageSize;
        this.pageNumber = response.data.pageNumber;
        this.totalPages = response.data.totalPages;
        this.totalCount = response.data.totalCount;

        this.toaster.success(response.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching doctors:', error);
      }
    });
  }

  onPageChange(newPage: number) {
    this.getAllDoctors(newPage, this.pageSize);
  }

  onViewDoctor(doctor: Doctor) {
    this.router.navigate(['/doctors', doctor.doctorId]);
  }

  onEditDoctor(doctor: Doctor) {
    this.router.navigate(['/doctors/edit', doctor.doctorId]);
  }

  onDeleteDoctor(doctor: Doctor) {
    this.selectedDoctor = {
      'Id': doctor.doctorId,
      'Full Name': doctor.fullName,
      'Specialization': doctor.specialization,
      'Contact Number': doctor.contactNumber,
      'Email': doctor.email
    };
    this.showModal = true;
  }

  deleteDoctor(doctorId: number) {
    this.doctorService.deleteDoctor(doctorId).subscribe({
      next: (response: DoctorResponse) => {
        this.toaster.success(response.message);
        this.reloadList();
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error deleting doctor:', error);
      }
    });
    this.showModal = false;
  }

  reloadList() {
    setTimeout(() => {
      this.getAllDoctors(this.pageNumber, this.pageSize);
    }, 2000);
  }
}
