import { Component, OnInit } from '@angular/core';
import { ViewComponent } from '../../../../shared/components/view/view.component';
import { ActivatedRoute } from '@angular/router';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { ToasterService } from '../../../../core/services/toaster.service';
import { UsersService } from '../../users.service';
import { UserResponse } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  userId: number = 0;
  userResponse: any = {};
  fields: any = [
    { key: 'username', label: 'Username (Email Address)', groupLabel: 'User' },
    { key: 'role', label: 'Role', groupLabel: 'User' },
    // { key: 'contactNumber', label: 'Contact Number', groupLabel: 'User' },
    // { key: 'email', label: 'Email Address', groupLabel: 'User' }
  ]

  userUiConfig: HeaderConfig = HeaderDefaults.userHeader;

  constructor(private userService: UsersService,
    private route: ActivatedRoute,
    private toaster: ToasterService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId && this.userId > 0) {
      this.getUser(this.userId);
    }
  }

  getUser(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (response:UserResponse) => {
        const user = response;
        this.userResponse = user.data;
        this.toaster.success(user.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching user:', error);
      }
    });
  }
}
