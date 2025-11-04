import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';
import { User, UserResponse } from '../../../../../shared/models/user.model';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { ToasterService } from '../../../../core/services/toaster.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ListItems } from '../../../../../shared/models/common.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableComponent, ConfirmDialogComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  // userList$ = new BehaviorSubject<User[]>([]);

  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  totalPages: number = 1;

  selectedUser: any = {};
  showModal = false;

  columns: object[] = [
    { field: 'firstName', header: 'First Name', permissionKey: 'FirstName', width: '250px' },
    { field: 'lastName', header: 'Last Name', permissionKey: 'LastName', width: '250px' },
    { field: 'username', header: 'Username (Email)', permissionKey: 'UserName', width: '400px' },
    { field: 'role', header: 'User Role', permissionKey: 'UserRole', width: '250px' },
  ];

  userUiConfig: HeaderConfig = HeaderDefaults.userHeader;

  constructor(
    private userService: UsersService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.getAllUsers(this.pageNumber, this.pageSize);
  }

  getAllUsers(page: number, size: number) {
    this.userService.getUsers(page, size).subscribe({
      next: (response: ListItems) => {
        this.userList = [...response.data.items];
        // const items = response.data.items as User[];
        // this.userList$.next([...items]);   //  new reference

        this.pageSize = response.data.pageSize;
        this.pageNumber = response.data.pageNumber;
        this.totalPages = response.data.totalPages;
        this.totalCount = response.data.totalCount;

        this.toaster.success(response.message);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error fetching users:', error);
      }
    });
  }

  onPageChange(newPage: number) {
    this.getAllUsers(newPage, this.pageSize);
  }

  onViewUser(user: User) {
    this.router.navigate(['/users', user.userId]);
  }

  onEditUser(user: User) {
    this.router.navigate(['/users/edit', user.userId]);
  }

  onDeleteUser(user: User) {
    this.selectedUser = {
      'ID': user.userId,
      'Full Name': user.firstName + " " + user.lastName,
      'Email': user.username,
      'Role': user.role
    };
    this.showModal = true;
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (response: UserResponse) => {
        this.toaster.success(response.message);
        this.reloadList();
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error deleting user:', error);
      }
    });
    this.showModal = false;
  }

  reloadList() {
    setTimeout(() => {
      this.getAllUsers(this.pageNumber, this.pageSize);
    }, 2000);
  }

}
