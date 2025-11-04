import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './app/core/layout/header/header.component';
import { SecurityService } from './features/auth/services/security.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'HospitalManagementSystemUI';

  constructor(private securityService:SecurityService) { }
  ngOnInit(): void {
    const roleId = localStorage.getItem('roleId');
    if (roleId) {
      this.securityService.refreshPermissions(roleId);
    } 
  }

}
