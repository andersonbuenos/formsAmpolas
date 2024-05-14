import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataDialogComponent } from '../../components/data-dialog/data-dialog.component';
import { UserService } from '../../user.service';


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

/* const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, macro: 'Campo Grande', municipioId: 'Campo Grande', tipoAmpola:'Antibotrópico', status: 'Geladeira', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: 2 },
  { id: 2, macro: 'Campo Grande', municipioId: 'Ribas do Rio Pardo', tipoAmpola:'Antielapédico', status: 'Geladeira', municipioRecebidoId: 'Campo Grande', municipioTransferidoId: '', totalAmpolas: 8 },
  { id: 3, macro: 'Dourados', municipioId: 'Ponta Porã', tipoAmpola:'Antiloxoscélico', status: 'Transferido', municipioRecebidoId: '', municipioTransferidoId: 'Amambaí', totalAmpolas: 3 },
  { id: 4, macro: 'Três Lagoas', municipioId: 'Inocência', tipoAmpola:'Antilbotrópico Crotálico', status: 'Descartado', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: 1 },
];
 */

/**
 * @title Toolbar overview
 */
@Component({
  selector: 'toolbar-overview-example, button-overview-example, table-filtering-example, FormFieldOverviewExample',
  templateUrl: 'user.component.html',
  styleUrl: 'user.component.scss',
  standalone: true,
  providers: [UserService],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class UserComponent {
  displayedColumns: string[] = ['id', 'macro', 'municipioId', 'tipoAmpola', 'status', 'municipioRecebidoId', 'municipioTransferidoId', 'totalAmpolas','Editar'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.getData().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.error('There was an error!', error);
    });
  }

  createData(): void {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px', // Defina a largura do diálogo conforme necessário
      // Outras configurações do MatDialog, se necessário
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O diálogo foi fechado');
      // Lógica a ser executada após o fechamento do diálogo, se necessário
    });
  }


  editData(element: any): void {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '400px',
      data: element

      // Defina a largura do diálogo conforme necessário
      // Outras configurações do MatDialog, se necessário
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O diálogo foi fechado');
      // Lógica a ser executada após o fechamento do diálogo, se necessário
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '500px', // Defina a largura do seu diálogo conforme necessário
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O diálogo foi fechado', result);
      // Atualize sua tabela ou faça qualquer ação necessária aqui
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


