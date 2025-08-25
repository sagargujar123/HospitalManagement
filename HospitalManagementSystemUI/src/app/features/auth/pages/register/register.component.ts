import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../../app/features/users/users.service';
import { User, UserResponse } from '../../../../shared/models/user.model';
import { ToasterService } from '../../../../app/core/services/toaster.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  showPassword = false;
  form!: FormGroup;
  passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$])[A-Za-z\d#@$]{8,}$/;
  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  constructor(private fb: FormBuilder, private userService: UsersService, private toaster: ToasterService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      role: [{ value: 'User', disabled: true }]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.registerUser();
  }

  registerUser() {
    const user: User = this.form.getRawValue();
    this.userService.createUser(user).subscribe({
      next: (response: UserResponse) => {
        this.form.reset();
        this.toaster.success(response.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error adding user:', error);
      }
    });
  }

}
