import { Injectable } from "@angular/core";
import { catchError, finalize, map, Observable, of, switchMap } from "rxjs";
import { ApiService } from "src/app/services/api/api.service";
import { ConfigService } from "src/app/services/config/config.service";
import { UiService } from "src/app/services/ui/ui.service";
export class EmployeeModel {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    basicSalary: number;
    status: string;
    group: string;
    description: string;

    constructor(data: EmployeeModel) {
        this.id = data.id || 0;
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.birthDate = data.birthDate ? new Date(data.birthDate) : new Date(); // Transform to Date object
        this.userName = data.userName || '';
        this.basicSalary = data.basicSalary || 0;
        this.status = data.status || 'active'
        this.group = data.group || ''
        this.description = data.description || ''
        this.email = data.email || '';
    }
    static search(employees: EmployeeModel[], searchTerms: Partial<EmployeeModel>): EmployeeModel[] {
        // Filter employees based on search criteria
        return employees.filter(employee =>
            (!searchTerms.firstName || employee.firstName.toLowerCase().includes(searchTerms.firstName.toLowerCase())) &&
            (!searchTerms.lastName || employee.lastName.toLowerCase().includes(searchTerms.lastName.toLowerCase())) &&
            (!searchTerms.email || employee.email.toLowerCase().includes(searchTerms.email.toLowerCase())) &&
            (!searchTerms.userName || employee.userName.toLowerCase().includes(searchTerms.userName.toLowerCase())) &&
            (!searchTerms.group || employee.group.toLowerCase().includes(searchTerms.group.toLowerCase())) &&
            (!searchTerms.description || employee.description.toLowerCase().includes(searchTerms.description.toLowerCase())) &&
            (!searchTerms.status || employee.status.toLowerCase() === searchTerms.status.toLowerCase()) &&
            (!searchTerms.birthDate || employee.birthDate.toDateString() === new Date(searchTerms.birthDate).toDateString()) &&
            (!searchTerms.basicSalary || employee.basicSalary === searchTerms.basicSalary)
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private apiService: ApiService, private uiService: UiService, private configService: ConfigService) {
        for (let i = 1; i <= 100; i++) {
            var status = 'active';
            var salary = 10000000;
            var group = 'Sales';
            var description = 'Top'

            if (i % 2 == 0) {
                status = 'inactive';
                group = 'IT';
                description = 'Moderate';
                salary = 11000000;
            }
            this.listEmployee.push({
                id: i,
                firstName: `last name${i}`,
                lastName: 'Doe',
                email: `john.doe@example.com${i}`,
                birthDate: new Date(1990, 0, 1),
                basicSalary: salary,
                description: description,
                group: group,
                status: status,
                userName: `Jono${i}`
            });
        }
    }
    public listEmployee: EmployeeModel[] = [];
    public Employee?: EmployeeModel;
    public listEmployeeTemp: EmployeeModel[] = [];

    saveEmployeeModel(data: any): Observable<any> {
        console.log(data);
        data = JSON.parse(data);
        data.id = this.listEmployee.length + 1
        this.listEmployee.push(data)
        return of(this.listEmployee)
    }
    editEmployeeModel(data: any): Observable<any> {
        console.log(this.Employee?.id);
        data = JSON.parse(data);
        data.id = this.Employee?.id
        const index = this.listEmployee.findIndex(employeeModel => employeeModel.id === this.Employee?.id);
        this.listEmployee[index]=data
        return of(this.listEmployee)
    }

    deleteData() {
        this.uiService.show();
        const index = this.listEmployee.findIndex(employeeModel => employeeModel.id === this.Employee?.id);
        if (index !== -1) {
            this.listEmployee.splice(index, 1); // Remove the item at the found index
        }
        console.log(this.listEmployee)
        this.uiService.hide()
        return of(this.listEmployee)
    }

    getlistEmployee(
        page: number,
        pageSize: number,
        searchQuery: string,
        sortField: string,
        sortDirection: 'asc' | 'desc',
        group: string,
        status: string
    ): Observable<{ listEmployee: EmployeeModel[]; totalItems: number }> {
        console.log("ssxx")
        console.log(this.listEmployeeTemp);
        if (this.listEmployeeTemp.length > 1) {
            const paginatedEmployees = this.listEmployeeTemp;
            this.listEmployeeTemp = [];

            return of({
                listEmployee: paginatedEmployees,
                totalItems: this.listEmployee.length // Total count includes all filtered employees
            });
        }
        // Apply sorting and searching logic here
        let filteredEmployees = this.listEmployee;

        searchQuery = searchQuery.toLowerCase();
        const searchCriteria = {
            status: status.toLowerCase() == 'all' ? '' : status,
            group: group.toLowerCase() == 'all' ? '' : group,
            firstName: searchQuery,

        };
        filteredEmployees = EmployeeModel.search(filteredEmployees, searchCriteria);

        if (sortField) {
            filteredEmployees = this.sortListEmployee(filteredEmployees, sortField, sortDirection);
        }
        // Apply pagination logic
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);
        // Return an object containing paginated employees and total count
        return of({
            listEmployee: paginatedEmployees,
            totalItems: this.listEmployee.length // Total count includes all filtered employees
        });
    }

    private sortListEmployee(listEmployee: EmployeeModel[], field: string, direction: 'asc' | 'desc'): EmployeeModel[] {
        // Sort listEmployee based on the specified field and direction
        return listEmployee.sort((a, b) => {
            const valueA = this.getFieldValue(a, field);
            const valueB = this.getFieldValue(b, field);

            if (direction === 'asc') {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        });
    }

    setDetailEmployee(id: number) {
        this.Employee = this.listEmployee.find(data => data.id === id);
    }
    setTempList(listEmployee: EmployeeModel[]) {
        this.listEmployeeTemp = listEmployee;
    }
    private getFieldValue(EmployeeModel: EmployeeModel, field: string): string {
        // Helper function to get the field value for sorting
        switch (field) {
            case 'firstName':
                return EmployeeModel.firstName;
            case 'id':
                return EmployeeModel.id.toString();
            case 'lastName':
                return EmployeeModel.lastName;
            case 'basicSalary':
                return EmployeeModel.basicSalary.toString();
            case 'email':
                return EmployeeModel.email;
            case 'group':
                return EmployeeModel.group;
            default:
                return ''; // Default to empty string for unknown fields
        }
    }
    getTotallistEmployeeCount(): Observable<number> {
        // Implement the logic to get the total count of listEmployee
        // In a real application, this might involve making a request to your backend API
        return of(this.listEmployee.length); // Replace this with the actual total count logic
    }

    getEmployeeModelById(id: number): Observable<EmployeeModel | undefined> {
        const EmployeeModel = this.listEmployee.find(emp => emp.id === id);
        return of(EmployeeModel);
    }
}
