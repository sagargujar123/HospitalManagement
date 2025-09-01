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

  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

   objectKeys = Object.keys;

  onConfirm(item: any) {
    this.confirm.emit(item);
    this.show = false;
  }

  onCancel() {
    this.cancel.emit();
    this.show = false;
  }
}
