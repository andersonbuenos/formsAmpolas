import { Injectable } from '@angular/core';
import {ModelData} from './modal-data';
//import { Observable }   from 'rxjs/Observable';
//import { HttpClient }   from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserService {

  constructor() { }

  getData() {
    return ELEMENT_DATA;
  }

  addData(formData: ModelData){
    ELEMENT_DATA.push(formData);
  }
}

const ELEMENT_DATA: ModelData[] = [
  { id: 1, macro: 'Campo Grande', municipioId: 'Campo Grande', tipoAmpola:'Antibotrópico', status: 'Geladeira', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: 2 },
  { id: 2, macro: 'Campo Grande', municipioId: 'Ribas do Rio Pardo', tipoAmpola:'Antielapédico', status: 'Geladeira', municipioRecebidoId: 'Campo Grande', municipioTransferidoId: '', totalAmpolas: 8 },
  { id: 3, macro: 'Dourados', municipioId: 'Ponta Porã', tipoAmpola:'Antiloxoscélico', status: 'Transferido', municipioRecebidoId: '', municipioTransferidoId: 'Amambaí', totalAmpolas: 3 },
  { id: 4, macro: 'Três Lagoas', municipioId: 'Inocência', tipoAmpola:'Antilbotrópico Crotálico', status: 'Descartado', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: 1 },
];
