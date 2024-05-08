import { UserService } from '../../user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'; // Importe FormGroup e FormBuilder para lidar com formulários reativos
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModelData } from '../../modal-data';
import { MatTableDataSource } from '@angular/material/table';
import { IbgeService } from '../../services/ibge.service';
import { Observable, tap} from 'rxjs';
import { CommonModule } from '@angular/common';


interface Municipio {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-data-dialog',
  templateUrl: 'data-dialog.component.html',
  styleUrls: ['data-dialog.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
})
export class DataDialogComponent {
  form: FormGroup; // Declare uma variável para armazenar o formulário FormGroup
  dataSource = new MatTableDataSource<ModelData>();
  municipios$: Observable<any[]>;
  municipios: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, // Injete FormBuilder para construir o formulário reativo
    private userService: UserService,
    private ibgeService: IbgeService,
  ) {
    // Inicialize o formulário reativo
    this.form = this.formBuilder.group({
      macro: ['', Validators.required],
      municipioId: ['', Validators.required],
      tipoAmpola: ['', Validators.required],
      status: ['', Validators.required],
      municipioRecebidoId: ['', []],
      municipioTransferidoId: ['', []],
      totalAmpolas: ['', []],
      // Defina o campo de entrada como obrigatório
    });

    console.log(data);
    if (data) {
      this.form.patchValue(data); // Preencha o formulário com os dados fornecidos
    }
  }

  async showMunicipios(): Promise<Municipio[]> {
    try {
      const data = await this.ibgeService.getMunicipiosMS();
      return this.municipios;
    } catch (err) {
      console.error(err);
      // Se ocorrer algum erro, você pode retornar um array vazio ou fazer algum tratamento adicional
      return [];
    }
  }


  async ngOnInit() {
    const municipios = await this.showMunicipios(); // Aguarde a resolução da Promise
    this.municipios$ = new Observable<Municipio[]>(observer => {
      observer.next(municipios);
      observer.complete();
    }).pipe(
      tap((data: Municipio[]) => {
        this.municipios = data;
      })
    );
  }




  onSubmit(): void {
    const formData = this.form.value;
    let id = this.userService.getData().length + 1;
    debugger;
    formData.id = id;
    this.userService.addData(formData);
    this.dialogRef.close(); // Feche o diálogo
  }
}
