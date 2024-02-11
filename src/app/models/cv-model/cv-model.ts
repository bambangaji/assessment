import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, of, switchMap } from "rxjs";
import { ApiService } from "src/app/services/api/api.service";
import { ConfigService } from "src/app/services/config/config.service";
import { UiService } from "src/app/services/ui/ui.service";
export class CvModel {
    id: number;
    type: string;
    user: string;
    title: string;
    dateRelease: Date | null;
    body: string;
    constructor(data: any) {
        this.id = data.id || 0;
        this.type = data.firstName || '';
        this.user = data.lastName || '';
        this.dateRelease = data.birthDate ? new Date(data.birthDate) : new Date(); // Transform to Date object
        this.title = data.title || '';
        this.body = data.body || '';
    }
}

@Injectable({
    providedIn: 'root'
})
export class CvService {
    constructor(private apiService: ApiService, private uiService: UiService, private configService: ConfigService) {

    }
    private listCV: CvModel[] = [];
    saveCvModel(data: any): Observable<any> {
        this.uiService.show();
       return this.apiService.postData(this.configService.GET_POST_DATA, data).pipe(
            finalize(() => {
                this.uiService.hide(); // Hide the UI service regardless of success or error
            })
        );
    }
    loadDataCv(): Observable<CvModel[]> {
        this.uiService.show();
        return this.apiService.getData(this.configService.GET_POST_DATA).pipe(
            finalize(() => {
                this.uiService.hide(); // Hide the UI service regardless of success or error
            })
        );
    }
    deleteData(id:any): Observable<CvModel[]> {
        this.uiService.show();
        return this.apiService.deleteData(this.configService.GET_POST_DATA,id).pipe(
            finalize(() => {
                this.uiService.hide(); // Hide the UI service regardless of success or error
            })
        );
    }
    loadDataCv101(): Observable<CvModel> {
        this.uiService.show();
        return this.apiService.getData(this.configService.GET_POST_DATA).pipe(
            finalize(() => {
                this.uiService.hide(); // Hide the UI service regardless of success or error
            })
        );
    }
    getlistCV(
        page: number,
        pageSize: number,
        searchQuery: string,
        sortField: string,
        sortDirection: 'asc' | 'desc'
    ): Observable<{ listCV: CvModel[]; totalItems: number }> {
        // Apply sorting and searching logic here
        return this.loadDataCv().pipe(
            switchMap(data => {
                let filteredlistCV = data;

                if (searchQuery) {
                    searchQuery = searchQuery.toLowerCase();
                    filteredlistCV = filteredlistCV.filter(CvModel =>
                        CvModel.title.toLowerCase().includes(searchQuery) ||
                        CvModel.body.toLowerCase().includes(searchQuery) 
                    );
                }

                if (sortField) {
                    filteredlistCV = this.sortlistCV(filteredlistCV, sortField, sortDirection);
                }

                // Apply pagination logic
                const startIndex = (page - 1) * pageSize;
                const endIndex = startIndex + pageSize;
                const paginatedlistCV = filteredlistCV.slice(startIndex, endIndex);

                // Return an object containing paginated listCV and total count
                return of({
                    listCV: paginatedlistCV,
                    totalItems: this.listCV.length // Total count includes all filtered listCV
                });
            })
        );
    }

    private sortlistCV(listCV: CvModel[], field: string, direction: 'asc' | 'desc'): CvModel[] {
        // Sort listCV based on the specified field and direction
        console.log('field');
        console.log(field);


        return listCV.sort((a, b) => {
            const valueA = this.getFieldValue(a, field);
            const valueB = this.getFieldValue(b, field);

            if (direction === 'asc') {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        });
    }


    private getFieldValue(CvModel: CvModel, field: string): string {
        // Helper function to get the field value for sorting
        switch (field) {
            case 'user':
                return CvModel.user;
            case 'id':
                return CvModel.id.toString();
            case 'title':
                return CvModel.title;
            case 'body':
                return CvModel.body;
            case 'type':
                return CvModel.type;
            default:
                return ''; // Default to empty string for unknown fields
        }
    }
    getTotallistCVCount(): Observable<number> {
        // Implement the logic to get the total count of listCV
        // In a real application, this might involve making a request to your backend API
        return of(this.listCV.length); // Replace this with the actual total count logic
    }
    getCvModelById(id: number): Observable<CvModel | undefined> {
        const CvModel = this.listCV.find(emp => emp.id === id);
        return of(CvModel);
    }
}
