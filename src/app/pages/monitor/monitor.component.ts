import { Component } from '@angular/core';

@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss'
})
export class MonitorComponent {
  currentView: string = 'cadastro';

  navigateTo(view: string) {
    this.currentView = view;
  }

}
