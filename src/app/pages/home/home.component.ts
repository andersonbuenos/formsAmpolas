import { CommonModule } from '@angular/common';
import { Component, HostBinding, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MonitorComponent } from "../monitor/monitor.component";
import { UserComponent } from "../user/user.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
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
        MatListModule,
        MonitorComponent,
        UserComponent
    ]
})
export class HomeComponent {
  currentView: string = 'cadastro';
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedItemId: number;
displayedColumns: any;

  navigateTo(view: string) {
    this.currentView = view;
  }

  createData() {
    // Implementação do método createData
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectItem(itemId: number) {
    this.selectedItemId = itemId; // Update the selectedItemId variable
  }

  isSelected(itemId: number) {
    return this.selectedItemId === itemId; // Check if the item is selected
  }
}
