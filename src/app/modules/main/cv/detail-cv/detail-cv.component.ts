import { Component } from '@angular/core';
import { CvModel, CvService } from 'src/app/models/cv-model/cv-model';

@Component({
  selector: 'app-detail-cv',
  templateUrl: './detail-cv.component.html',
  styleUrls: ['./detail-cv.component.scss']
})
export class DetailCvComponent {
  constructor(private cvService: CvService) {

  }
  public cvData?: CvModel;
  ngOnInit() {
    this.cvData = this.cvService.CV
  }
}
