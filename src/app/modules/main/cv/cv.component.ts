import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';
import { CvModel, CvService } from 'src/app/models/cv-model/cv-model';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent {
  private unsubscribe$ = new Subject<void>();
  addNewCV() {
    this.router.navigate(['/main/add-cv']);
  }
  @ViewChild('modalRef') modalRef!: ModalComponent;
  loading = true;
  listCV: CvModel[] = [];
  pageSizeOptions: number[] = [10, 20, 30];
  pageSize: number = 10;
  currentPage: number = 1;
  searchQuery: string = '';
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  totalItems: number = 0;
  constructor(private CvModelService: CvService, private router: Router, private configService: ConfigService) {

  }
  openModal(title: string, content: string) {
    this.modalRef.show(title, content);
  }
  ngOnInit() {
    this.CvModelService.loadDataCv().subscribe(data => {
      this.listCV = data;
      this.CvModelService.loadDataCv101().subscribe(data101 => {
        console.log(this.listCV);
      })
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  loadCvModels(): void {
    // Fetch CvModels based on sorting, searching, and paging criteria
    this.CvModelService.getlistCV(this.currentPage, this.pageSize, this.searchQuery, this.sortField, this.sortDirection)
      .subscribe(result => {
        console.log(result);
        this.listCV = result.listCV;
        this.totalItems = result.totalItems;
      });
  }
  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  toAddCvModel(): void {
    this.router.navigate(['/CvModel/add-CvModel']);
  }
  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1; // Reset to the first page when changing page size
    this.loadCvModels();
  }


  onSearch(): void {
    this.currentPage = 1;
    this.loadCvModels();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCvModels();
  }

  onSort(field: string): void {
    console.log(field);

    if (field === this.sortField) {
      // Reverse the sort direction if clicking on the same field
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the sort field and direction
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.loadCvModels();
  }

  toDetailPage(CvModelId: number) {
    console.log(this.listCV);
    this.router.navigate(['/main/detail-cv']);
  }
}
