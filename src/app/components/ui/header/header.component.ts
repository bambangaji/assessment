import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private UiService: UiService) {}

  toggleSidebar(): void {
    this.UiService.toggleSidebar();
  }
}
