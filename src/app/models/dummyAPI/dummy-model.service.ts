import { Injectable } from '@angular/core';
import { finalize, map, Observable, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { DummyModel } from './dummy';

@Injectable({
  providedIn: 'root'
})
export class DummyModelService {

  constructor(private apiService: ApiService, private uiService: UiService, private configService: ConfigService) { }
  public listDataDummy: DummyModel[] = [];
  public Employee?: DummyModel;

  saveEmployeeModel(data: any): Observable<any> {
    console.log(data);
    data = JSON.parse(data);
    data.id = this.listDataDummy.length + 1
    this.listDataDummy.push(data)
    return of(this.listDataDummy)
  }
  loadData(): Observable<DummyModel[]> {
    this.uiService.show();
    console.log(this.configService.apiUrl);

    return this.apiService.getData(this.configService.apiUrl).pipe(
      map((data) => {
        this.listDataDummy=data;
        return this.listDataDummy;
      }),
      finalize(() => {
        this.uiService.hide(); // Hide the UI service regardless of success or error
      })
    );
  }

  getlistData(): Observable<{ listData: DummyModel[]; totalItems: number }> {
    // Apply sorting and searching logic here
    return this.loadData().pipe(
      switchMap(data => {

        let filteredlist = data;
        console.log(filteredlist)
        this.listDataDummy = filteredlist;
        // Return an object containing paginated listCV and total count
        return of({
          listData: filteredlist,
          totalItems: this.listDataDummy.length // Total count includes all filtered listCV
        });
      })
    );
  }
}
