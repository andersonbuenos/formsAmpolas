import { Injectable } from '@angular/core';
import { Observable }   from 'rxjs';
import { HttpClient }   from '@angular/common/http';
import { PeriodicElement } from './pages/user/user.component';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserService {

  private apiUrl = 'http://localhost:3000/elements';

  constructor(private http: HttpClient) { }

// Buscar dados
  getData(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.apiUrl);
  }

  // Adicionar dados
  createData(data: PeriodicElement): Observable<PeriodicElement> {
    return this.http.post<PeriodicElement>(this.apiUrl, data);
  }

  // Atualizar dados
  updateData(id: number, data: PeriodicElement): Observable<PeriodicElement> {
    return this.http.put<PeriodicElement>(`${this.apiUrl}/${id}`, data);
  }

  // Deletar dados
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}


/* const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, macro: 'Campo Grande', municipioId: 'Campo Grande', tipoAmpola:'Antibotrópico', status: 'Geladeira', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: 2 },
  { id: 2, macro: 'Campo Grande', municipioId: 'Ribas do Rio Pardo', tipoAmpola:'Antielapédico', status: 'Geladeira', municipioRecebidoId: 'Campo Grande', municipioTransferidoId: '', totalAmpolas: 8 },
  { id: 3, macro: 'Dourados', municipioId: 'Ponta Porã', tipoAmpola:'Antiloxoscélico', status: 'Transferido', municipioRecebidoId: '', municipioTransferidoId: 'Amambaí', totalAmpolas: 3 },
  { id: 4, macro: 'Três Lagoas', municipioId: 'Inocência', tipoAmpola:'Antilbotrópico Crotálico', status: 'Descartado', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: 1 },
]; */
