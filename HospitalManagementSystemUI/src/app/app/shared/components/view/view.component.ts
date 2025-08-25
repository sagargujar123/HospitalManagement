import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CustomTransformPipe } from '../../pipes/custom-transform.pipe';
import { HeaderConfig } from '../../../../shared/models/formfield.model';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, CustomTransformPipe],
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
}
