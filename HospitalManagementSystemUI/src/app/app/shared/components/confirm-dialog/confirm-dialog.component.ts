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
