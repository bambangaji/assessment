import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  sidebarState = false;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.uiService.sidebarState$.subscribe(state => {
      this.sidebarState = state;
    });
  }
}
