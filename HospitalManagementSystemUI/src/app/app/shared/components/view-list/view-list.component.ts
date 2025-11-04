import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderConfig } from '../../../../shared/models/formfield.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.css'
})
export class ViewListComponent implements OnInit {

  searchText = '';
  searchChildText = '';
  expanded: boolean = false;
  searchBox: boolean = false;
  currentPage = 1;
  filteredData: any[] = [];
  filterChildData: any[] = [];

  @Input() config: HeaderConfig = {};

  @Input() headerText: string = 'Header Text';
  @Input() parentColumns: { field: string, header: string, width: string }[] = [];
  @Input() data: any[] = [];
  @Input() childColumns: { field: string, header: string, width: string }[] = [];

  @Input() pageNumber = 1;
  @Input() pageSize = 10;
  @Input() totalCount = 0;
  @Input() totalPages = 1;

  @Input() addButtonRoute: string = '';
  @Input() addChildButtonRoute: string = '';

  @Output() addClicked = new EventEmitter<void>();

  @Output() editParentClicked = new EventEmitter<any>();
  @Output() deleteParentClicked = new EventEmitter<any>();

  @Output() editChildClicked = new EventEmitter<any>();
  @Output() deleteChildClicked = new EventEmitter<any>();

  @Output() pageChange = new EventEmitter<number>();

  constructor(private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.filteredData = [...this.data];

      this.filteredData.forEach((item) => {
        item.originalPermissions = item.permissions ? [...item.permissions] : [];
        item.filterChildData = [...item.permissions];
        item.searchChildText = '';
      });

      this.cdr.markForCheck();
    }
  }

  handleField(event: any) {
    switch (event) {
      case true:
        return `<span class="inline-flex items-center justify-center w-5 h-5 rounded-sm bg-green-500">
                <i class="fas fa-check text-white text-xs"></i>
              </span>`;
      case false:
        return `<span class="inline-flex items-center justify-center w-5 h-5 rounded-sm bg-red-500">
                <i class="fas fa-times text-white text-xs"></i>
              </span>`;
      default:
        return event;
    }
  }

  onAdd() {
    if (this.addButtonRoute) {
      this.router.navigate([this.addButtonRoute]);
    } else {
      this.addClicked.emit();
    }
  }

  onAddChild() {
    if (this.addChildButtonRoute) {
      this.router.navigate([this.addChildButtonRoute]);
    } else {
      this.addClicked.emit();
    }
  }

  onEditParent(row: any) {
    this.editParentClicked.emit(row);
  }

  onDeleteParent(row: any) {
    this.deleteParentClicked.emit(row);
  }

  onEditChild(row: any) {
    this.editChildClicked.emit(row);
  }

  onDeleteChild(row: any) {
    this.deleteChildClicked.emit(row);
  }

  getCellValue(row: any, field: string): any {
    if (!field) return '';
    if (field.includes('.')) {
      // Handle nested path e.g. patient.fullName
      return field.split('.').reduce((acc, part) => acc && acc[part], row);
    }
    return row[field]; // fallback for normal fields
  }


  searchBoxState: { [roleId: number]: boolean } = {};

  toggleSearchBox(roleId: number) {
    this.searchBoxState[roleId] = !this.searchBoxState[roleId];
  }

  isSearchBoxOpen(roleId: number): boolean {
    return !!this.searchBoxState[roleId];
  }

  onSearchChildItems(row: any) {
    if (!row.searchChildText) {
      row.filterChildData = [...row.originalPermissions];
    } else {
      const lower = row.searchChildText.toLowerCase();

      row.filterChildData = row.originalPermissions.filter((row: any) =>
        this.childColumns.some((col) => {
          const cellValue = this.getCellValue(row, col.field);
          return cellValue && String(cellValue).toLowerCase().includes(lower);
        })
      );
    }
  }

  onSearch() {
    if (!this.searchText) {
      this.filteredData = [...this.data];
    } else {
      const lower = this.searchText.toLowerCase();

      this.filteredData = this.data.filter((row) =>
        this.parentColumns.some((col) => {
          const cellValue = this.getCellValue(row, col.field);
          return cellValue && String(cellValue).toLowerCase().includes(lower);
        })
      );
    }
    this.currentPage = 1;
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

}
