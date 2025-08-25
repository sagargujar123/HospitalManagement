import { Component } from '@angular/core';
import { HeaderComponent } from './app/core/layout/header/header.component';
import { FooterComponent } from './app/core/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HospitalManagementSystemUI';
}
