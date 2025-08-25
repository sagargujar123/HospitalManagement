import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';
import { User, UserResponse } from '../../../../../shared/models/user.model';
import { HeaderConfig } from '../../../../../shared/models/formfield.model';
import { HeaderDefaults } from '../../../../../shared/models/headerdefaults.models';
import { ToasterService } from '../../../../core/services/toaster.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ListItems } from '../../../../../shared/models/common.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  userList: User[] = [];
  // userList$ = new BehaviorSubject<User[]>([]);

  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;
  totalPages: number = 1;

  columns: object[] = [
    { field: 'username', header: 'Username (Email)', width: '400px' },
    { field: 'role', header: 'User Role', width: '400px' },
 
  ];

  userUiConfig: HeaderConfig = HeaderDefaults.userHeader;

  constructor(private userService: UsersService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService) { }

  ngOnInit() {
    this.getAllUsers(this.pageNumber, this.pageSize);
  }

  getAllUsers(page: number, size: number) {
    this.userService.getUsers(page, size).subscribe({
      next: (response:ListItems) => {
        const responseItem = response;
        console.log('Users response:', responseItem);
        this.userList = [...responseItem.data.items];
        // const items = responseItem.data.items as User[];
        // this.userList$.next([...items]);   //  new reference

        this.pageSize = responseItem.data.pageSize;
        this.pageNumber = responseItem.data.pageNumber;
        this.totalPages = responseItem.data.totalPages;
        this.totalCount = responseItem.data.totalCount;

        this.toaster.success(responseItem.message);
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
    console.log('Delete User:', user);
    this.userService.deleteUser(user.userId).subscribe({
      next: (response:UserResponse) => {
        const responseData = response;
        this.toaster.success(responseData.message);
        this.getAllUsers(this.pageNumber, this.pageSize);
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        console.error('Error deleting user:', error);
      }
    });
  }
}
