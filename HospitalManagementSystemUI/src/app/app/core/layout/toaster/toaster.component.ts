import { Component, OnInit } from '@angular/core';
import { ToasterMessage, ToasterService } from '../../services/toaster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent implements OnInit {
  message: ToasterMessage | null = null;
  visible = false;

  constructor(private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.toasterService.toasterState.subscribe((msg) => {
      this.message = msg;
      this.visible = true;

      // Auto hide after 3 sec
      setTimeout(() => {
        this.visible = false;
      }, 2000);
    });
  }
}
