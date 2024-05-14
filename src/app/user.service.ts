import { Injectable } from '@angular/core';
import {ModelData} from './modal-data';
import { Observable }   from 'rxjs';
import { HttpClient }   from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

// Buscar dados
  getData(): Observable<ModelData[]> {
    return this.http.get<ModelData[]>(this.apiUrl);
  }

  // Adicionar dados
  addData(formData: ModelData): Observable<ModelData> {
    return this.http.post<ModelData>(this.apiUrl, formData);
  }

  // Atualizar dados
  updateData(id: number, formData: ModelData): Observable<ModelData> {
    return this.http.put<ModelData>(`${this.apiUrl}/${id}`, formData);
  }

  // Deletar dados
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}


/* const ELEMENT_DATA: ModelData[] = [
  { id: 1, macro: 'Campo Grande', municipioId: 'Campo Grande', tipoAmpola:'Antibotrópico', status: 'Geladeira', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: 2 },
  { id: 2, macro: 'Campo Grande', municipioId: 'Ribas do Rio Pardo', tipoAmpola:'Antielapédico', status: 'Geladeira', municipioRecebidoId: 'Campo Grande', municipioTransferidoId: '', totalAmpolas: 8 },
  { id: 3, macro: 'Dourados', municipioId: 'Ponta Porã', tipoAmpola:'Antiloxoscélico', status: 'Transferido', municipioRecebidoId: '', municipioTransferidoId: 'Amambaí', totalAmpolas: 3 },
  { id: 4, macro: 'Três Lagoas', municipioId: 'Inocência', tipoAmpola:'Antilbotrópico Crotálico', status: 'Descartado', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: 1 },
]; */
