import { UserService } from '../../user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importe FormGroup e FormBuilder para lidar com formulários reativos
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModelData } from '../../modal-data';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-dialog',
  templateUrl: 'data-dialog.component.html',
  styleUrls: ['data-dialog.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule],
})
export class DataDialogComponent {
  form: FormGroup; // Declare uma variável para armazenar o formulário FormGroup
  dataSource = new MatTableDataSource<ModelData>();

  constructor(
    public dialogRef: MatDialogRef<DataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, // Injete FormBuilder para construir o formulário reativo
    private userService: UserService
  ) {
    // Inicialize o formulário reativo
    this.form = this.formBuilder.group({
      input: ['', Validators.required], // Defina o campo de entrada como obrigatório
      select: ['', Validators.required], // Defina o campo de seleção como obrigatório
      textarea: [''] // Deixe o campo de textarea opcional
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ModelData>(this.userService.getData());
    /* this.dataSource.paginator = this.paginator; */

  }

  onSubmit(): void {
    if (this.form.valid) { // Verifique se o formulário é válido antes de prosseguir
      const formData = this.form.value;
      let id = this.userService.getData().length + 1;
      formData.id = id;
      this.userService.addData(formData);
      this.dialogRef.close(); // Feche o diálogo
    }
  }
}
