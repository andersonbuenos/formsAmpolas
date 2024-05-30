import { UserService } from '../../user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModelData } from '../../modal-data';
import { MatTableDataSource } from '@angular/material/table';
import { IbgeService } from '../../services/ibge.service';
import { Observable, of } from 'rxjs';
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
  @Output() dataSaved: EventEmitter<ModelData> = new EventEmitter<ModelData>();
  @Output() dataCreated: EventEmitter<ModelData> = new EventEmitter<ModelData>();

  form: FormGroup;
  municipios$: Observable<any[]>;
  municipios: any[] = [];


  constructor(
    public dialogRef: MatDialogRef<DataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private ibgeService: IbgeService
  ) {
    this.form = this.formBuilder.group({
      id: null,
      macro: ['', Validators.required],
      municipioId: ['', Validators.required],
      tipoAmpola: ['', Validators.required],
      status: ['', Validators.required],
      municipioRecebidoId: [{ value: '', disabled: false }, []],
      municipioTransferidoId: [{ value: '', disabled: false }, []],
      totalAmpolas: ['', Validators.required],
    });

    if (data) {
      this.form.patchValue(data);
    }
  }

  async showMunicipios(): Promise<void> {
    try {
      const data = await this.ibgeService.getMunicipiosMS();
      this.municipios = data || [];
    } catch (err) {
      console.error(err);
      this.municipios = [];
    }
  }

  async ngOnInit() {
    await this.showMunicipios();
    this.municipios$ = of(this.municipios);
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
    if (this.data.isEditing) {
      // Se houver um ID, estamos editando, então emitimos os dados para atualização
      console.log('Editando com sucesso:', formData);
      this.dataSaved.emit(formData);
    } else {
      // Se não houver um ID, estamos criando, então emitimos os dados para criação
      console.log('Criando com sucesso:', formData);
      this.dataCreated.emit(formData);
    }
    this.dialogRef.close(formData);
  }
  
}