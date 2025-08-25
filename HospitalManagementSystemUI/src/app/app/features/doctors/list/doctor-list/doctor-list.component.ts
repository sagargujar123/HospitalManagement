import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Doctor } from '../../../../../shared/models/doctor.model';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { Router } from '@angular/router';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { ToasterService } from '../../../../core/services/toaster.service';
import { DoctorsService } from '../../doctors.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, TableComponent],
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

  columns: object[] = [
    { field: 'fullName', header: 'Full Name', width: '250px' },
    { field: 'specialization', header: 'Specialization', width: '250px' },
    { field: 'contactNumber', header: 'Contact Number', width: '250px' },
    { field: 'email', header: 'Email Address', width: '300px' }
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
      next: (response) => {
        this.responseItem = response;
        console.log('Doctors response:', this.responseItem);
        this.doctorList = [...this.responseItem.data.items];
        // const items = this.responseItem.data.items as Doctor[];
        // this.doctorList$.next([...items]);   //  new reference

        this.pageSize = this.responseItem.data.pageSize;
        this.pageNumber = this.responseItem.data.pageNumber;
        this.totalPages = this.responseItem.data.totalPages;
        this.totalCount = this.responseItem.data.totalCount;

        this.toaster.success(this.responseItem.message);
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
    console.log('Delete Doctor:', doctor);
    // this.doctorService.deleteDoctor(doctor.doctorId).subscribe({
    //   next: (response) => {
    //     const responseData = response as any;
    //     this.toaster.success(responseData.message);
    //     this.getAllDoctors(this.pageNumber, this.pageSize);
    //   },
    //   error: (error) => {
    //     this.toaster.error(error.error.message);
    //     console.error('Error deleting doctor:', error);
    //   }
    // });
  }
}
