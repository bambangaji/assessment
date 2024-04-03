import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private configService: ConfigService) {

  }


  getData(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log("Response:");
        console.log(response);
        return response;
      }),
      catchError(error => {
        console.error("Error occurred:", error);
        // You can throw a custom error or return a default value here
        return throwError("An error occurred while fetching data.");
      })
    );
  }
  getData101(url: string): Observable<any> {
    return this.http.get<any>(url + '/1').pipe(
      map(response => {
        console.log("Response:");
        console.log(response);
        return response;
      }),
      catchError(error => {
        console.error("Error occurred:", error);
        // You can throw a custom error or return a default value here
        return throwError("An error occurred while fetching data.");
      })
    );
  }
  postData(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data).pipe(
      map((response: HttpResponse<any>) => {
        // Extract the data from the response
        return response.body;
      })
    );
  }
  deleteData(url: any, id: any): Observable<any> {
    return this.http.delete<any>(url + '/' + id).pipe(
      map((response: HttpResponse<any>) => {
        // Extract the data from the response
        return response.body;
      })
    );
  }
  putData(data: any): Observable<any> {
    return this.http.put<any>(this.configService.GET_POST_DATA, data).pipe(
      map((response: HttpResponse<any>) => {
        // Extract the data from the response
        return response.body;
      })
    );
  }
}
