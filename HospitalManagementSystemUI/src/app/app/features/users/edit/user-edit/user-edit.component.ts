import { Component, OnInit } from '@angular/core';
import { FormField, HeaderConfig } from '../../../../../shared/models/formfield.model';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserResponse } from '../../../../../shared/models/user.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { ToasterService } from '../../../../core/services/toaster.service';
import { UsersService } from '../../users.service';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../../shared/components/form/form.component';
import { Error } from '../../../../../shared/models/common.model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  userId: number = 0; // for Edit case
  userLoadFlag: boolean = false;

  roleList: any[] = [
    { id: 'User', name: 'User' },
    { id: 'Admin', name: 'Admin' },
    { id: 'Doctor', name: 'Doctor' },
    { id: 'Patient', name: 'Patient' },
  ];

  fields: FormField[] = [];
  // For Edit -> provide object; For Add -> keep empty
  user: User = {
    userId: 0,
    username: '',
    password: '',
    role: '',
  };

  userUiConfig: HeaderConfig = HeaderDefaults.userHeader;
  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$])[A-Za-z\d#@$]{8,}$/;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.formFieldMethod();
    this.getUserApiCall();
  }

  getUserApiCall() {
    this.userId = this.route.snapshot.params['id'];
    console.log('User ID from route:', this.userId);
    if (this.userId && this.userId > 0) {
      this.getUserById(this.userId);
    } else {
      this.userLoadFlag = true;
    }
  }

  formFieldMethod() {
    this.fields = [
      {
        name: 'username', label: 'Email Address', type: 'email', placeholder: 'Enter Email Address',
        validations: [
          { name: 'required', message: 'Email Address is required' },
          { name: 'pattern', value: this.emailPattern, message: 'Enter a valid email address (eg. user@gmail.com)' },
        ]
      },
      {
        name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password',
        validations: [
          { name: 'required', message: 'Password is required' },
          { name: 'minlength', value: 8, message: 'Password must be at least 8 characters' },
          { name: 'pattern', value: this.passwordPattern, message: 'Password Format should be: Password@123' }
        ]
      },
      {
        name: 'role', label: 'User Role', type: 'select', options: this.roleList, placeholder: 'Select User Role',
        validations: [
          { name: 'required', message: 'User Role selection is required' }
        ]
      },
    ];
  }

  addUser(user: User) {
    this.userService.createUser(user).subscribe({
      next: (response: UserResponse) => {
        console.log("user: ", response);
        const responseItem = response;
        this.toaster.success(responseItem.message);
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 2000);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error adding user:', error);
      }
    });
  }

  getUserById(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (response: UserResponse) => {
        const userResponse = response;
        this.user = userResponse.data;
        console.log('User data:', this.user);
        this.toaster.success(userResponse.message);

        this.userLoadFlag = true;
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching user:', error.error);
      }
    });
  }

  updateUser(user: User) {
    console.log("user: ", user);
    this.userService.updateUser(user.userId, user).subscribe({
      next: (response:UserResponse) => {
        const responseItem = response;
        this.toaster.success(responseItem.message);
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 2000);

      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error updating user:', error);
      }
    });
  }

  onSubmit(data: any) {
    if (this.userId && this.userId > 0) {
      this.updateUser(data);
    } else {
      this.addUser(data);
    }
  }
}
