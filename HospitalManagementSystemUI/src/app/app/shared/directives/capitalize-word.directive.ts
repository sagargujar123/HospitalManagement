import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[capitalizeWord]',
  standalone: true
})
export class CapitalizeWordDirective {

  constructor(private control: NgControl) { }

  @HostListener('blur') onBlur() {
    const value = this.control.value;
    if (value) {
      const capitalized = value
        .toLowerCase()
        .replace(/\b\w/g, (char: any) => char.toUpperCase());
      this.control.control?.setValue(capitalized);
    }
  }

}
