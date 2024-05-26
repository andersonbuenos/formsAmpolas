import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Municipio {
  id: string;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/50/municipios'; // Ajuste para a URL correta da sua API

  constructor(private http: HttpClient) {}

  async getMunicipiosMS(): Promise<Municipio[]> {
    try {
      const response = await this.http.get<Municipio[]>(this.apiUrl).toPromise();
      return response || [];
    } catch (err) {
      console.error(err);
      throw err; // Lança o erro para ser tratado pelo componente que chamou a função
    }
  }
}
