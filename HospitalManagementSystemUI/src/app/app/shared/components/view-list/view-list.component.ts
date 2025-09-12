import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.css'
})
export class ViewListComponent {
  // @Input() columns: any[] = [];
  // @Input() patientList: any[] = [];
  // @Input() patient: any;

  // Table columns definition
  columns: any = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'dateOfBirth', label: 'Date of Birth' },
    { key: 'gender', label: 'Gender' },
    { key: 'contactNumber', label: 'Contact Number' },
    { key: 'address', label: 'Address' }
  ];

  doctor: any = {
    name: "Dr. Kautik Sane",
    specialization: "General Physician",
    email: "sane@gmail.com",
    contact: "9099080706",
    age: "Dr. Kautik Sane",
    salary: "General Physician",
    mail: "sane@gmail.com",
    contactNum: "9099080706"
  };

  doctorColumns: any = [
    { key: 'name', label: 'Name' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'email', label: 'Email' },
    { key: 'contact', label: 'Contact' },
    { key: 'age', label: 'Name' },
    { key: 'salary', label: 'Specialization' },
    { key: 'mail', label: 'Email' },
    { key: 'contactNum', label: 'Contact' }
  ];


  // Patients list
  patientList: any = [
    {
      patientId: 1,
      fullName: 'Satish Jadhav',
      dateOfBirth: '1998-12-16',
      gender: 'Male',
      contactNumber: '9908765432',
      address: 'Nashik, Maharashtra'
    },
    {
      patientId: 2,
      fullName: 'Komal Shinde',
      dateOfBirth: '2000-04-12',
      gender: 'Female',
      contactNumber: '8890764532',
      address: 'Mumbai'
    },
    {
      patientId: 5,
      fullName: 'Vikas Bari',
      dateOfBirth: '2025-08-15',
      gender: 'Male',
      contactNumber: '7899065523',
      address: 'Katraj, Pune'
    }
  ];

  searchTerm: string = '';

  get filteredPatients() {
    if (!this.searchTerm) return this.patientList;
    // return this.patientList.filter(p =>
    //   Object.values(p).some(val =>
    //     val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    //   )
    // );

    return this.patientList.filter((p: any) =>
      Object.values(p).some((val: unknown) =>
        val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  goBack() {
    window.history.back();
  }
}
