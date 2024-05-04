import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface PeriodicElement {
  id: number;
  macro: string;
  municipioId: string;
  tipoAmpola: string;
  status: string;
  municipioRecebidoId: string;
  municipioTransferidoId: string;
  totalAmpolas: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, macro: 'Campo Grande', municipioId: 'Campo Grande', tipoAmpola:'Antibotrópico', status: 'Geladeira', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: 2 },
  { id: 2, macro: 'Campo Grande', municipioId: 'Ribas do Rio Pardo', tipoAmpola:'Antielapédico', status: 'Geladeira', municipioRecebidoId: 'Campo Grande', municipioTransferidoId: '', totalAmpolas: 8 },
  { id: 3, macro: 'Dourados', municipioId: 'Ponta Porã', tipoAmpola:'Antiloxoscélico', status: 'Transferido', municipioRecebidoId: '', municipioTransferidoId: 'Amambaí', totalAmpolas: 3 },
  { id: 4, macro: 'Três Lagoas', municipioId: 'Inocência', tipoAmpola:'Antilbotrópico Crotálico', status: 'Descartado', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: 1 },
];


/**
 * @title Toolbar overview
 */
@Component({
  selector: 'toolbar-overview-example, button-overview-example, table-filtering-example, FormFieldOverviewExample',
  templateUrl: 'user.component.html',
  styleUrl: 'user.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule]
})
export class UserComponent {
  displayedColumns: string[] = ['id', 'macro', 'municipioId', 'tipoAmpola', 'status', 'municipioRecebidoId', 'municipioTransferidoId', 'totalAmpolas','Editar'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

