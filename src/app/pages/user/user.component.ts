import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  id: number;
  macro: string;
  municipioId: string;
  tipoAmpola: string;
  status: string;
  municipioRecebidoId: string;
  municipioTransferidoId: string;
  totalAmpolas: number;
  createdAt: Date;
}

@Component({
  selector: 'app-user, toolbar-overview-example, button-overview-example, table-filtering-example, FormFieldOverviewExample, paginator-overview-example',
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
    MatPaginatorModule,
    CommonModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class UserComponent {
  displayedColumns: string[] = ['id', 'macro', 'municipioId', 'tipoAmpola', 'status', 'municipioRecebidoId', 'municipioTransferidoId', 'totalAmpolas', 'createdAt', 'Editar'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  municipiosMap: Map<string | number, string> = new Map();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private ibgeService: IbgeService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMunicipios();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  createDataTable(data: PeriodicElement): void {
    // Convertendo nomes de municípios para IDs
    data.municipioId = this.getMunicipioIdByName(data.municipioId);
    data.municipioRecebidoId = this.getMunicipioIdByName(data.municipioRecebidoId);
    data.municipioTransferidoId = this.getMunicipioIdByName(data.municipioTransferidoId);

    this.userService.createDataTable(data).subscribe({
      next: (res) => {
        console.log('Dado criado com sucesso!');
        this.loadData();
      },
      error: (e) => console.error('Erro ao criar dado', e)
    });
  }

  getMunicipioIdByName(nome: string): string {
    return this.municipiosMap.get(nome) || nome; // Retorna o nome se o ID não for encontrado
  }

  openDialog(element?: PeriodicElement): void {
    const isEditing = !!element; // Verifica se é uma edição ou uma criação

    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '500px',
      data: element ? { ...element, isEditing } : { id: undefined, macro: '', municipioId: '', tipoAmpola: '', status: '', municipioRecebidoId: '', municipioTransferidoId: '', totalAmpolas: '', isEditing: false },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isEditing) {
          this.updateData(result); // Atualiza os dados
        } else {
          this.createDataTable(result); // Cria novos dados
        }
      }
    });
  }

  updateData(element: PeriodicElement): void {
    this.userService.updateData(element.id, element).subscribe({
      next: (res) => {
        console.log('Edição Concluída!');
        this.loadData();
      },
      error: (e) => console.error('Erro de Edição', e)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
