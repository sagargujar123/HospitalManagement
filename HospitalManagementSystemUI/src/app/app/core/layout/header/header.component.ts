import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dropdownOpen = false;
  sidebarOpen = false;
  isMobile = false; // Adjust based on your breakpoint
  userName = 'John Doe'; // TODO: Replace with actual user name from API/Auth

   constructor(
    public router: Router
   ) { this.checkScreen(); }

   @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }

   checkScreen() {
    this.isMobile = window.innerWidth < 768; // Mobile breakpoint
    if (!this.isMobile) {
      this.sidebarOpen = false; // auto show sidebar on tablet/desktop
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onLogout() {
    // Clear token & redirect to login
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }
}
