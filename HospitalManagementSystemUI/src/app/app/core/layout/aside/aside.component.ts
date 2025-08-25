import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../features/auth/services/auth.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit {
  @Input() isMobile = false; // Adjust based on your breakpoint
  @Input() sidebarOpen: boolean = false;

  constructor(public authService: AuthService) {
    this.checkScreen();
  }

  ngOnInit(): void {

  }

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
}
