import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { Patient, PatientResponse } from '../../../../../shared/models/patient.model';
import { PatientsService } from '../../patients.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from '../../../../core/services/toaster.service';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { ListItems } from '../../../../../shared/models/common.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [TableComponent, CommonModule, ConfirmDialogComponent],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit {
  patientList: Patient[] = [];
  // patientList$ = new BehaviorSubject<Patient[]>([]);

  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  totalPages: number = 1;

  selectedPatient: any = {};
  showModal = false;

  columns: object[] = [
    { field: 'fullName', header: 'Full Name', permissionKey: 'FullName', width: '250px' },
    { field: 'dateOfBirth', header: 'Age', permissionKey: 'Age', width: '250px', pipeType: 'age' },
    { field: 'gender', header: 'Gender', permissionKey: 'Gender', width: '250px' },
    { field: 'contactNumber', header: 'Contact Number', permissionKey: 'ContactNumber', width: '250px' },
    { field: 'address', header: 'Address', permissionKey: 'Address', width: '300px' }
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
      next: (response: ListItems) => {
        this.patientList = [...response.data.items];
        // const items = response.data.items as Patient[];
        // this.patientList$.next([...items]);   //  new reference

        this.pageSize = response.data.pageSize;
        this.pageNumber = response.data.pageNumber;
        this.totalPages = response.data.totalPages;
        this.totalCount = response.data.totalCount;

        this.toaster.success(response.message);
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
    this.selectedPatient = {
      'ID': patient.patientId,
      'Full Name': patient.fullName,
      'Gender': patient.gender,
      'Contact Number': patient.contactNumber,
      'Address': patient.address
    };
    this.showModal = true;
  }

  deletePatient(patientId: number) {
    this.patientService.deletePatient(patientId).subscribe({
      next: (response: PatientResponse) => {
        this.toaster.success(response.message);
        this.reloadList();
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error deleting patient:', error);
      }
    });
    this.showModal = false;
  }

  reloadList() {
    setTimeout(() => {
      this.getAllPatients(this.pageNumber, this.pageSize);
    }, 2000);
  }

}