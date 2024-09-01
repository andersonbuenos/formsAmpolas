import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from './pages/user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/data';
  getMunicipios: any;
  createData: any;
  getHistoryData: any;

  constructor(private http: HttpClient) { }

  getData(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.apiUrl);
  }

  createDataTable(data: PeriodicElement): Observable<PeriodicElement> {
    return this.http.post<PeriodicElement>(this.apiUrl, data);
  }

  updateData(id: number, data: PeriodicElement): Observable<PeriodicElement> {
    return this.http.put<PeriodicElement>(`${this.apiUrl}/${id}`, data);
  }

  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
export { PeriodicElement };

