/* import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  createOrUpdateData(data: any): Observable<any> {
    if (data.id !== undefined && data.id !== null) {

      return this.http.put('/api/data/' + data.id, data);
    } else {

      return this.http.post('/api/data', data);
    }
  }
} */