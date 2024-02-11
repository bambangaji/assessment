import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ left: 0 })),
      state('out', style({ left: '-350px' })),
      transition('in => out', animate('400ms ease-out')),
      transition('out => in', animate('400ms ease-in'))
    ])
  ]
})
export class SidebarComponent {
  sidebarState = false;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.uiService.sidebarState$.subscribe(state => {
      this.sidebarState = state;
    });
  }
  toggleSidebar(): void {
    this.uiService.toggleSidebar();
  }
}
