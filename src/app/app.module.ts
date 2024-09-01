/* import { DataDialogModule } from './../../.history/src/app/components/data-dialog/data-dialog.module_20240504172647'; */
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { UserComponent } from './pages/user/user.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { IbgeService } from './services/ibge.service';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MonitorComponent,
    HomeComponent
  ],
  imports: [
    NgModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatTable,
    MatTableDataSource,
    MatDialogModule,
    MatSnackBarModule,
    MatSnackBar,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
/*     DataDialogModule, */
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    IbgeService,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    UserService,
    MatTableModule,
    DatePipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    /*     { provide: UserService, useValue: {} }, */
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
