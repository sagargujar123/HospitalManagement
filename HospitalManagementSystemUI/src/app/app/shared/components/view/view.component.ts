import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomTransformPipe } from '../../pipes/custom-transform.pipe';
import { HeaderConfig } from '../../../../shared/models/formfield.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, CustomTransformPipe, FormsModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  @Input() data: any;
  @Input() config: HeaderConfig = {};

  @Input() fields: {
    key: string;
    label: string;
    pipe?: string;
    cellClass?: (value: any) => string;
    row: number;
    colSpan: number;
    groupLabel:string;
  }[] = [];

  @Input() columns: any[] = [];
  @Input() listData: any[] = [];
  @Input() isList: boolean = true;
  @Input() listTitle: string = 'View Details';
  @Output() editClicked = new EventEmitter<any>();

  // Handles nested fields like patient.fullName, doctor.contactNumber
  getCellValue(row: any, field: string): any {
    if (!field) return '—';

    if (field.includes('.')) {
      return field.split('.').reduce((acc, part) => acc && acc[part], row) ?? '—';
    }

    return row[field] ?? '—';
  }

  getRows() {
    const grouped: { [row: number]: any[] } = {};
    this.fields.forEach(f => {
      grouped[f.row] = grouped[f.row] || [];
      grouped[f.row].push(f);
    });
    return Object.values(grouped);
  }

  goBack() {
    window.history.back();
  }

  searchTerm: string = '';

  get filteredItems() {
    if (!this.searchTerm) return this.listData;
    return this.listData.filter(p =>
      Object.values(p).some(val =>
        val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  onEdit(row: any) {
    this.editClicked.emit(row);
  }

}
