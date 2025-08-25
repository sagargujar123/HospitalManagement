import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToasterComponent } from '../toaster/toaster.component';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { AsideComponent } from "../aside/aside.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, ToasterComponent, AsideComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dropdownOpen = false;
  sidebarOpen = false;
  isMobile = false; // Adjust based on your breakpoint
  userName = 'John Doe'; // TODO: Replace with actual user name from API/Auth

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onLogout() {
    this.authService.clearLocalStorage();
    this.router.navigate(['/auth/login']);
  }
}
