import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../../app/features/users/users.service';
import { User, UserResponse } from '../../../../shared/models/user.model';
import { ToasterService } from '../../../../app/core/services/toaster.service';
import { CapitalizeWordDirective } from "../../../../app/shared/directives/capitalize-word.directive";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, CapitalizeWordDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  showPassword = false;
  isEdit: boolean = false;
  userId: number = 0;
  form!: FormGroup;
  passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$])[A-Za-z\d#@$]{8,}$/;
  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  textPattern = /^[A-Za-z]/;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private toaster: ToasterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(this.textPattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.textPattern)]],
      username: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      role: [{ value: 'User', disabled: true }]
    });
    this.form.get('role')?.disable();
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId && this.userId > 0) {
      this.getUser();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.userId && this.userId > 0) {
      this.UpdateUser();
    } else {
      this.registerUser();
    }
  }

  editProfile() {
    this.isEdit = true;
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: (response: UserResponse) => {
        this.toaster.success(response.message);
        this.patchValue(response.data);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error adding user:', error);
      }
    });
  }

  patchValue(data: User) {
    this.form.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password ? data.password : null,
      role: data.role
    });

    this.form.get('password')?.clearValidators();
    this.form.get('password')?.updateValueAndValidity();
  }

  registerUser() {
    const user: User = this.form.getRawValue();
    this.userService.createUser(user).subscribe({
      next: (response: UserResponse) => {
        this.form.reset();
        this.toaster.success(response.message);
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error adding user:', error);
      }
    });
  }

  UpdateUser() {
    const user: User = this.form.getRawValue();
    this.userService.updateUser(this.userId, user).subscribe({
      next: (response: UserResponse) => {
        this.toaster.success(response.message);
        this.isEdit = false;
        this.patchValue(response.data);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error adding user:', error);
      }
    });
  }

  closeProfile() {
    this.router.navigate(['/dashboard']);
  }

  viewProfile() {
    this.isEdit = false;
  }

}
