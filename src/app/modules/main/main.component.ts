import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Input() userName: string = '';
  @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>();

  logout(): void {
    this.logoutClicked.emit();
  }
}
