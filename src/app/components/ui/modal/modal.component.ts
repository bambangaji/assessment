import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CvService } from 'src/app/models/cv-model/cv-model';

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
  constructor(private CvModelService: CvService) {

  }
  closeModal() {
    this.isVisible = false;
    if (this.title == 'Delete') {
      this.CvModelService.deleteData(10).subscribe()
     }
    this.closed.emit();
  }
  show(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.isVisible = true;
  }
  hide() {
    this.isVisible = false;
  }
}
