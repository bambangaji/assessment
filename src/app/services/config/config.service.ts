import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = environment.apiUrl;
  GET_POST_DATA = this.apiUrl+'/posts';
  constructor() { }
  getApiUrl(): string {
    return this.apiUrl;
  }
}
