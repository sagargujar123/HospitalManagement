import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { Patient } from '../../../../../shared/models/patient.model';
import { PatientsService } from '../../patients.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from '../../../../core/services/toaster.service';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit {
  responseItem: any;
  patientList: Patient[] = [];
  // patientList$ = new BehaviorSubject<Patient[]>([]);

  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  totalPages: number = 1;

  columns: object[] = [
    { field: 'fullName', header: 'Full Name', width: '250px' },
    { field: 'dateOfBirth', header: 'Age', width: '250px', pipeType: 'age' },
    { field: 'gender', header: 'Gender', width: '250px' },
    { field: 'contactNumber', header: 'Contact Number', width: '250px' },
    { field: 'address', header: 'Address', width: '300px' }
  ];

  patientUiConfig: HeaderConfig = HeaderDefaults.patientHeader;

  constructor(private patientService: PatientsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService) { }

  ngOnInit() {
    this.getAllPatients(this.pageNumber, this.pageSize);
  }

  getAllPatients(page: number, size: number) {
    this.patientService.getPatients(page, size).subscribe({
      next: (response) => {
        this.responseItem = response;
        console.log('Patients response:', this.responseItem);
        this.patientList = [...this.responseItem.data.items];
        // const items = this.responseItem.data.items as Patient[];
        // this.patientList$.next([...items]);   //  new reference

        this.pageSize = this.responseItem.data.pageSize;
        this.pageNumber = this.responseItem.data.pageNumber;
        this.totalPages = this.responseItem.data.totalPages;
        this.totalCount = this.responseItem.data.totalCount;

        this.toaster.success(this.responseItem.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching patients:', error);
      }
    });
  }

  onPageChange(newPage: number) {
    this.getAllPatients(newPage, this.pageSize);
  }

  onViewPatient(patient: Patient) {
    this.router.navigate(['/patients', patient.patientId]);
  }

  onEditPatient(patient: Patient) {
    this.router.navigate(['/patients/edit', patient.patientId]);
  }

  onDeletePatient(patient: Patient) {
    console.log('Delete Patient:', patient);
    // this.patientService.deletePatient(patient.patientId).subscribe({
    //   next: (response) => {
    //     const responseData = response as any;
    //     this.toaster.success(responseData.message);
    //     this.getAllPatients(this.pageNumber, this.pageSize);
    //   },
    //   error: (error) => {
    //     this.toaster.error(error.error.message);
    //     console.error('Error deleting patient:', error);
    //   }
    // });
  }
}