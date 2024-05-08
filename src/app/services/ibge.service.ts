import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  constructor(private http: HttpClient) {}

  async getMunicipiosMS() {
    try {
      const response = await this.http
        .get<any[]>(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados/50/municipios'
        )
        .toPromise();
      return response;
    } catch (err) {
      console.error(err);
      throw err; // Lança o erro para ser tratado pelo componente que chamou a função
    }
  }
}
