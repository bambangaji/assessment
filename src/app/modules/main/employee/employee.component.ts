import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';
import { EmployeeModel, EmployeeService } from 'src/app/models/user/employee-model';
import { ConfigService } from 'src/app/services/config/config.service';
import { RoutingService } from 'src/app/services/routing/routing.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  private unsubscribe$ = new Subject<void>();
  addNewCV() {
    this.routing.goToAddEmployee()
  }
  @ViewChild('modalRef') modalRef!: ModalComponent;
  loading = true;
  listEmployee: EmployeeModel[] = [];
  pageSizeOptions: number[] = [10, 20, 30];
  pageSize: number = 10;
  currentPage: number = 1;
  searchQuery: string = '';
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  totalItems: number = 0;
  selectedGroup: string = 'All';
  selectedStatus: string = 'All';
  listGroup = [
    'IT',
    'Sales',
    'HR',
    'BoD',
    'Staff',
    'Customer Service',
    'Front Office',
    'Admin',
    'Manager',
    'Event Organizer',
    'All'
  ];
  listStatus = [
    'active',
    'inactive',
    'All'
  ];
  constructor(private EmployeeModelService: EmployeeService, private routing: RoutingService) {

  }
  openModal(title: string, content: string, id: number) {
    this.EmployeeModelService.setDetailEmployee(id)
    this.modalRef.show(title, content);
  }
  ngOnInit() {
    this.loadEmployeeModels()
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  loadEmployeeModels(): void {
    console.log("load")
    // Fetch EmployeeModels based on sorting, searching, and paging criteria
    this.EmployeeModelService.getlistEmployee(this.currentPage, this.pageSize, this.searchQuery, this.sortField, this.sortDirection, this.selectedGroup, this.selectedStatus)
      .subscribe(result => {
        console.log(result);
        this.listEmployee = result.listEmployee;
        this.totalItems = result.totalItems;
      });
  }
  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1; // Reset to the first page when changing page size
    this.loadEmployeeModels();
  }


  onSearch(): void {
    console.log("search" + this.selectedGroup + this.selectedStatus)
    this.currentPage = 1;
    this.loadEmployeeModels();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadEmployeeModels();
  }

  onSort(field: string): void {
    if (field === this.sortField) {
      // Reverse the sort direction if clicking on the same field
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the sort field and direction
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.loadEmployeeModels();
  }

  toDetailPage(EmployeeModelId: number) {
    this.EmployeeModelService.setDetailEmployee(EmployeeModelId)
    this.EmployeeModelService.setTempList(this.listEmployee);
    this.routing.goToDetailEmployee();
  }
  toEditPage(EmployeeModelId: number) {
    this.EmployeeModelService.setDetailEmployee(EmployeeModelId)
    this.routing.goToEditEmployee();
  }
}
