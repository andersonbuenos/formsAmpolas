import { ChangeDetectorRef, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataDialogComponent } from '../../components/data-dialog/data-dialog.component';
import { UserService } from '../../user.service';
import { IbgeService, Municipio } from '../../services/ibge.service';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';

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

@Component({
  selector: 'toolbar-overview-example, button-overview-example, table-filtering-example, FormFieldOverviewExample, paginator-overview-example',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  standalone: true,
  providers: [UserService, IbgeService, MatPaginatorModule],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule
    /* JsonPipe, */
  ]
})
export class UserComponent {
  displayedColumns: string[] = ['id', 'macro', 'municipioId', 'tipoAmpola', 'status', 'municipioRecebidoId', 'municipioTransferidoId', 'totalAmpolas', 'Editar'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  municipiosMap: Map<string | number, string> = new Map();
/*   length: number;
  pageSize: number;
  pageIndex: number;
  pageSizeOptions: number[]; */

  constructor(
    private userService: UserService,
    private ibgeService: IbgeService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.loadMunicipios();
  }

  loadMunicipios() {
    this.ibgeService.getMunicipiosMS().then(municipios => {
      municipios?.forEach(municipio => {
        this.municipiosMap.set(municipio.id, municipio.nome);
      });
      this.loadData(); // Carregar os dados após os municípios
    }).catch(error => {
      console.error('Error loading municipios!', error);
    });
  }
  

  loadData() {
    this.userService.getData().subscribe(data => {
      data.forEach(item => {
        item.municipioId = this.municipiosMap.get(item.municipioId) || item.municipioId;
        item.municipioRecebidoId = this.municipiosMap.get(item.municipioRecebidoId) || item.municipioRecebidoId;
        item.municipioTransferidoId = this.municipiosMap.get(item.municipioTransferidoId) || item.municipioTransferidoId;
      });
      this.dataSource.data = data;
    }, error => {
      console.error('There was an error!', error);
    });
  }

  createData(): void {
    this.openDialog();
  }

  editData(element: PeriodicElement): void {
    this.openDialog(element);
  }

  createOrUpdateData(data: PeriodicElement): void {
    console.log('Data:', data);
  
    // Convertendo nomes de municípios para IDs
    data.municipioId = this.getMunicipioIdByName(data.municipioId);
    data.municipioRecebidoId = this.getMunicipioIdByName(data.municipioRecebidoId);
    data.municipioTransferidoId = this.getMunicipioIdByName(data.municipioTransferidoId);
  
    if (data.id !== undefined && data.id !== null) {
      this.userService.updateData(data.id, data).subscribe({
        next: (res) => {
          console.log('Data updated successfully!');
          this.loadData();
        },
        error: (e) => console.error('Error updating data', e)
      });
    } else {
      this.userService.createData(data).subscribe({
        next: (res) => {
          console.log('Data created successfully!');
          this.loadData();
        },
        error: (e) => console.error('Error creating data', e)
      });
    }
  }
  
  getMunicipioIdByName(nome: string): string {
    return this.municipiosMap.get(nome) || nome; // Retorna o nome se o ID não for encontrado
  }
  
  

  openDialog(element?: PeriodicElement): void {
    if (element) {
      element.municipioId = this.municipiosMap.get(element.municipioId) || element.municipioId;
      element.municipioRecebidoId = this.municipiosMap.get(element.municipioRecebidoId) || element.municipioRecebidoId;
      element.municipioTransferidoId = this.municipiosMap.get(element.municipioTransferidoId) || element.municipioTransferidoId;
    }

    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '500px',
      data: element ? element : { id: undefined, macro: '', municipioId: '', tipoAmpola: '', status: '', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: '' },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.municipioId = this.getMunicipioIdByName(result.municipioId);
        result.municipioRecebidoId = this.getMunicipioIdByName(result.municipioRecebidoId);
        result.municipioTransferidoId = this.getMunicipioIdByName(result.municipioTransferidoId);

        this.createOrUpdateData(result);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
