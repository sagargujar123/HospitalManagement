import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  @Input() title: string = 'Confirm Delete';
  @Input() message: string = 'Are you sure you want to delete this item?';
  @Input() item: any;
  @Input() show: boolean = false;

  @Input() dropdownOptions: string[] = [];
  @Input() showForm: boolean = false;

  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() update = new EventEmitter<any>();

  selectedStatus: string = '';
  isSelected: boolean = false;

  onDropdownChange(event: any) {
    this.isSelected = false;
    this.selectedStatus = event;
  }

  objectKeys = Object.keys;

  handleField(item: any) {
  switch (item) {
    case true:
      return `
        <span class="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-600 border border-green-400 text-sm font-medium">
          TRUE
        </span>`;
    case false:
      return `
        <span class="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 border border-red-400 text-sm font-medium">
          FALSE
        </span>`;
    default:
      return item ? item : '--';
  }
}

  onConfirm(item: any) {
    this.confirm.emit(item);
    this.show = false;
  }

  onCancel() {
    this.cancel.emit();
    this.show = false;
    this.showForm = false;
  }

  onUpdate(item: any) {
    if (this.selectedStatus && this.selectedStatus !== '') {
      item.status = this.selectedStatus;
      this.update.emit(item);
      this.showForm = false;
    } else {
      this.isSelected = true;
      return;
    }
  }

}
