import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToasterService } from '../../../../app/core/services/toaster.service';
import { AuthResponse, LoginRequest } from '../../../../shared/models/auth.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword: boolean = false;
  form!: FormGroup;
  passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$])[A-Za-z\d#@$]{8,}$/;
  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private toaster: ToasterService,
    private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
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
    this.login();
  }

  login() {
    const user: LoginRequest = this.form.value;
    this.authService.login(user).subscribe({
      next: (response: AuthResponse) => {
        this.toaster.success(response.message);
        this.authService.setToken(response.data.token);
        this.authService.setRole(response.data.role);
        this.authService.setName(response.data.fullName);
        this.authService.setUserId(response.data.userId);

        const defaultRoute = this.authService.getDefaultRouteForRole(response.data.role);
        this.router.navigate([defaultRoute]);
      },
      error: (error) => {
        // this.toaster.error(error.error?.message);
        console.error('Error adding user:', error);
      }
    });
  }
}
