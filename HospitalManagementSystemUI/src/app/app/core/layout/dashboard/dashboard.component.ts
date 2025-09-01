import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  // Final stats (target values)
  stats = {
    appointments: 120,
    users: 80,
    patients: 200,
    doctors: 40
  };

  // Animated counters
  displayStats = {
    appointments: 0,
    users: 0,
    patients: 0,
    doctors: 0
  };

   appointmentsBars: number[] = [40, 70, 50, 90];

   // Patients line trend
  patientsTrend: number[] = [20, 45, 35, 60, 55, 70];
  get patientsTrendPoints(): string {
    return this.patientsTrend.map((val, i) => `${i * 20},${100 - val}`).join(' ');
  }

  ngOnInit(): void {
    this.animateCounters();
  }

  // Function to increment values smoothly
  animateCounters() {
    Object.keys(this.stats).forEach((key) => {
      const target = (this.stats as any)[key];
      let current = 0;
      const step = Math.ceil(target / 60); // animation steps (~1 sec)
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          (this.displayStats as any)[key] = target;
          clearInterval(interval);
        } else {
          (this.displayStats as any)[key] = current;
        }
      }, 16); // 60fps
    });
  }

  // Fake trend data for mini line chart
  trendData: number[] = [20, 40, 35, 60, 55, 70, 90];

  // Convert trend data to SVG polyline string
  get trendPoints(): string {
    return this.trendData.map((val, i) => `${i * 20},${100 - val}`).join(' ');
  }
}
