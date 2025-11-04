import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomTransformPipe } from '../../pipes/custom-transform.pipe';
import { HeaderConfig } from '../../../../shared/models/formfield.model';
import { SecurityService } from '../../../../features/auth/services/security.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomTransformPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {
  @Input() entityName = '';
  visibleColumns: any[] = [];

  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() showDropdown = false;
  @Input() dropdownOptions: string[] = [];

  // ADD server-side paging inputs
  @Input() pageNumber = 1;
  @Input() pageSize = 10;
  @Input() totalCount = 0;
  @Input() totalPages = 1;

  @Input() addButtonRoute: string = ''; // route to navigate when Add clicked
  @Input() config: HeaderConfig = {};

  // Outputs for row actions
  @Output() addClicked = new EventEmitter<void>();
  @Output() editClicked = new EventEmitter<any>();
  @Output() viewClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();

  @Output() pageChange = new EventEmitter<number>();
  @Output() dropdownChange = new EventEmitter<string>();

  searchText = '';
  filteredData: any[] = [];
  currentPage = 1;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private securityService: SecurityService) { }

  ngOnInit() {
    this.filteredData = [...this.data];
    // this.filteredData = [...this.data].reverse(); // Reverse the data for display
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.filteredData = [...this.data];
      this.cdr.markForCheck();
      this.setVisibleColumns();
    }
  }

  setVisibleColumns() {
    this.visibleColumns = this.columns.filter(col =>
      this.securityService.can(this.entityName, col.permissionKey, 'isVisible')
    );
    console.log('Visible Columns:', this.visibleColumns);
  }

  can(action: 'canAdd' | 'canEdit' | 'canDelete' | 'canView' | 'isVisible', column?: any): boolean {
    if (column) {
      return this.securityService.can(this.entityName, column.permissionKey, action);
    }
    return this.columns.some(col => this.securityService.can(this.entityName, col.permissionKey, action));
  }

  getCellValue(row: any, field: string): any {
    if (!field) return '';
    if (field.includes('.')) {
      // Handle nested path e.g. patient.fullName
      return field.split('.').reduce((acc, part) => acc && acc[part], row);
    }
    return row[field]; // fallback for normal fields
  }

  onSearch() {
    if (!this.searchText) {
      this.filteredData = [...this.data];
    } else {
      const lower = this.searchText.toLowerCase();

      this.filteredData = this.data.filter((row) =>
        this.columns.some((col) => {
          const cellValue = this.getCellValue(row, col.field);
          return cellValue && String(cellValue).toLowerCase().includes(lower);
        })
      );
    }

    this.currentPage = 1;
  }

  onDropdownChange(value: string) {
    this.dropdownChange.emit(value);
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.pageChange.emit(this.pageNumber - 1);
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageChange.emit(this.pageNumber + 1);
    }
  }

  onAdd() {
    if (this.addButtonRoute) {
      this.router.navigate([this.addButtonRoute]);
    } else {
      this.addClicked.emit();
    }
  }

  onView(row: any) {
    this.viewClicked.emit(row);
  }

  onEdit(row: any) {
    this.editClicked.emit(row);
  }

  onDelete(row: any) {
    this.deleteClicked.emit(row);
  }
}
