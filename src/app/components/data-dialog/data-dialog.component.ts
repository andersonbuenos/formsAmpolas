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
import { Observable, of, tap} from 'rxjs';
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
      municipioId: ['', []],
      tipoAmpola: ['', Validators.required],
      status: ['', Validators.required],
      municipioRecebidoId: [{value: '', disabled: false}, []],
      municipioTransferidoId: [{value: '', disabled: false}, []],
      totalAmpolas: ['', []],
      // Defina o campo de entrada como obrigatório
    });

    console.log(data);
    if (data) {
      this.form.patchValue(data); // Preencha o formulário com os dados fornecidos
    }
  }

  async showMunicipios(): Promise<void> {
    try {
      const data = await this.ibgeService.getMunicipiosMS();
      this.municipios = data || []; // Provide a fallback value to ensure the type is always an array // Atualize a propriedade com os dados obtidos
    } catch (err) {
      console.error(err);
      this.municipios = []; // Em caso de erro, defina como array vazio
    }
  }
  
  async ngOnInit() {
    await this.showMunicipios(); // Isso agora atualiza `this.municipios` diretamente
    this.municipios$ = of(this.municipios); // Cria um Observable a partir de `this.municipios`
    this.handleStatusChanges();
  }

  handleStatusChanges(): void {
    this.form.get('status')!.valueChanges.subscribe((status) => {
      if (status === 'Recebido') {
        this.form.get('municipioTransferidoId')!.disable();
        this.form.get('municipioRecebidoId')!.enable();
      } else if (status === 'Transferido') {
        this.form.get('municipioRecebidoId')!.disable();
        this.form.get('municipioTransferidoId')!.enable();
      } else {
        this.form.get('municipioRecebidoId')!.enable();
        this.form.get('municipioTransferidoId')!.enable();
      }
    });
  }


  onSubmit(): void {
    const formData = this.form.value;
    /* let id = this.userService.getData().length + 1; */
/*     debugger; */
    /* formData.id = id; */
    /* this.userService.addData(formData); */
    this.dialogRef.close(); // Feche o diálogo
  }
}
