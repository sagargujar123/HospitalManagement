import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormField, HeaderConfig } from '../../../../shared/models/formfield.model';
import { CapitalizeWordDirective } from '../../directives/capitalize-word.directive';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CapitalizeWordDirective],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnChanges {
  @Input() formFields: FormField[] = [];
  @Input() initialData: any = {};          // for Edit case
  @Input() idField: number = 0;         // default ID field
  @Input() config: HeaderConfig = {}

  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;
  isEdit: boolean = false;
  showPassword: boolean = false;


  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formFields'] || changes['initialData']) {
      this.initForm();
    }
  }

  initForm() {
    const group: any = {};

    this.formFields.forEach(field => {
      const validators: any[] = [];

      if (field.validations) {
        field.validations.forEach(v => {

          if (field.name === 'password' && this.initialData && this.idField && this.idField !== 0) {
            return; // <-- stop adding validators for password in update
          }

          switch (v.name) {
            case 'required': validators.push(Validators.required); break;
            case 'minlength': validators.push(Validators.minLength(v.value)); break;
            case 'maxlength': validators.push(Validators.maxLength(v.value)); break;
            case 'pattern': validators.push(Validators.pattern(v.value)); break;
            case 'email': validators.push(Validators.email); break;
            case 'min': validators.push(Validators.min(v.value)); break;
            case 'max': validators.push(Validators.max(v.value)); break;
          }
        });
      }

      // check for both add and edit mode
      group[field.name] = [this.initialData?.[field.name] || '', validators];
    });

    this.form = this.fb.group(group);

    // detect edit mode
    if (this.initialData && this.idField && this.idField !== 0) {
      this.isEdit = true;
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = { ...this.initialData, ...this.form.value };

    // If fullname exists, convert it to Title Case
    if (payload.fullName) {
      payload.fullName = payload.fullName
        .toLowerCase()
        .replace(/\b\w/g, (char: any) => char.toUpperCase());

      if (payload.specialization || payload.doctorId == 0) {
        payload.fullName = `Dr. ${payload.fullName}`;
      }
    }
    this.formSubmit.emit(payload);
  }

  goBack() {
    window.history.back();
  }
}
