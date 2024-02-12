import { Injectable } from "@angular/core";
import { catchError, finalize, map, Observable, of, switchMap } from "rxjs";
import { ApiService } from "src/app/services/api/api.service";
import { ConfigService } from "src/app/services/config/config.service";
import { UiService } from "src/app/services/ui/ui.service";
export class CvModel {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    skill: string;
    email: string;
    birthDate: Date;
    gender: string;

    constructor(data: any) {
        this.id = data.id || 0;
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.birthDate = data.birthDate ? new Date(data.birthDate) : new Date(); // Transform to Date object
        this.address = data.address || '';
        this.skill = data.skill || '';
        this.email = data.email || '';
        this.gender = data.gender || '';
    }
}

@Injectable({
    providedIn: 'root'
})
export class CvService {
    constructor(private apiService: ApiService, private uiService: UiService, private configService: ConfigService) {
        for (let i = 1; i <= 5; i++) {
            var skill = 'Javascript';
            var gender = 'Male';
            if (i % 2 == 0) {
                skill = 'Angular';
                gender = 'Female'
            }
            this.listCV.push({
                id: i,
                firstName: `last name${i}`,
                lastName: 'Doe',
                email: `john.doe@example.com${i}`,
                birthDate: new Date(1990, 0, 1),
                skill: skill,
                gender: gender,
                address: 'this is address'
            });
        }
    }
    public listCV: CvModel[] = [];
    public CV?: CvModel;
    saveCvModel(data: any): Observable<any> {
        console.log(data);
        data = JSON.parse(data);
        data.id = this.listCV.length + 1
        this.listCV.push(data)
        return of(this.listCV)
    }

    loadDataCv(): Observable<CvModel[]> {
        this.uiService.show();
        return this.apiService.getData(this.configService.GET_POST_DATA).pipe(
            map((data) => {
                this.listCV;
                return this.listCV;
            }),
            finalize(() => {
                this.uiService.hide(); // Hide the UI service regardless of success or error
            })
        );
    }
    deleteData(): Observable<CvModel[]> {
        this.uiService.show();
        const index = this.listCV.findIndex(cvModel => cvModel.id === this.CV?.id);
        if (index !== -1) {
            this.listCV.splice(index, 1); // Remove the item at the found index
        }
        return this.apiService.deleteData(this.configService.GET_POST_DATA, this.CV?.id).pipe(
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
                        CvModel.firstName.toLowerCase().includes(searchQuery) ||
                        CvModel.lastName.toLowerCase().includes(searchQuery)
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

    setDetailCV(id: number) {
        this.CV = this.listCV.find(data => data.id === id);
    }
    private getFieldValue(CvModel: CvModel, field: string): string {
        // Helper function to get the field value for sorting
        switch (field) {
            case 'firstName':
                return CvModel.firstName;
            case 'id':
                return CvModel.id.toString();
            case 'lastName':
                return CvModel.lastName;
            case 'email':
                return CvModel.email;
            case 'skill':
                return CvModel.skill;
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
