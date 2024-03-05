import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from 'src/app/models/user/employee-model';

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
  constructor(private EmployeeModelService: EmployeeService) {

  }
  closeModal() {
    this.isVisible = false;
    if (this.title == 'Delete') {
      this.EmployeeModelService.deleteData()
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
