import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[titleCase]',
  standalone: true
})
export class TitlecaseDirective {
  constructor(private control: NgControl) { }

  @HostListener('blur') onBlur() {
    const value = this.control.value;
    if (value) {
      const titleCaseText = value
        .toLowerCase()
        .replace(/\b\w/g, (char: any) => char.toUpperCase());
      this.control.control?.setValue(titleCaseText);
    }
  }
}
