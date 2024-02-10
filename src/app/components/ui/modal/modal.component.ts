import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Output() closed = new EventEmitter<void>();
  isVisible: boolean = false;
  closeModal() {
    this.isVisible = false;
    this.closed.emit();
  }
  show(title:string,content:string) {
    this.title=title;
    this.content=content;
    this.isVisible = true;
  }
  hide() {
    this.isVisible = false;
  }
}
