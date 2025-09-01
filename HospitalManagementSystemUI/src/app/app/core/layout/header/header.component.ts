import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToasterComponent } from '../toaster/toaster.component';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { AsideComponent } from "../aside/aside.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToasterComponent, AsideComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userId: string = '';
  dropdownOpen = false;
  sidebarOpen = false;
  isMobile = false; // Adjust based on your breakpoint

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  viewProfile(){
    this.userId = this.authService.getUserId();
    this.router.navigate(['/register/edit',this.userId]);
  }

  onLogout() {
    this.authService.clearLocalStorage();
    this.router.navigate(['/auth/login']);
  }
}
