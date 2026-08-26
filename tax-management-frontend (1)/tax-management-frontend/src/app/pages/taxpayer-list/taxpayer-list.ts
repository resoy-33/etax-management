import { AfterViewInit, Component, OnInit, ViewChild, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TaxpayerService } from '../../services/taxpayer.service';
import { Taxpayer } from '../../models/taxpayer';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-taxpayer-list',
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './taxpayer-list.html',
  styleUrl: './taxpayer-list.css',
})
export class TaxpayerList implements OnInit, AfterViewInit {
  readonly displayedColumns = ['nif', 'name', 'activity', 'phone', 'status', 'actions'];
  readonly dataSource = new MatTableDataSource<Taxpayer>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public taxpayerService: TaxpayerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource.filterPredicate = (taxpayer, filter) => {
      const haystack = [
        taxpayer.nif,
        taxpayer.firstName,
        taxpayer.lastName,
        taxpayer.companyName,
        taxpayer.activity,
        taxpayer.phone,
        taxpayer.city,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(filter);
    };

    // Keep the table's data source in sync with the service's signal cache,
    // so any create/update/delete anywhere in the app is reflected here live.
    effect(() => {
      this.dataSource.data = this.taxpayerService.taxpayers();
    });
  }

  ngOnInit(): void {
    this.taxpayerService.refresh().subscribe({
      next: () => (this.loading = false),
      error: () => {
        this.loading = false;
        this.snackBar.open(
          'Impossible de charger les contribuables. Le serveur est-il démarré ?',
          'Fermer',
          { duration: 5000 }
        );
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayName(taxpayer: Taxpayer): string {
    return taxpayer.taxpayerType === 'Personne Morale'
      ? taxpayer.companyName
      : `${taxpayer.firstName} ${taxpayer.lastName}`.trim();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  statusColor(status: string): 'primary' | 'accent' | 'warn' | undefined {
    switch (status) {
      case 'Actif':
        return 'primary';
      case 'En attente':
        return 'accent';
      case 'Suspendu':
      case 'Inactif':
        return 'warn';
      default:
        return undefined;
    }
  }

  deleteTaxpayer(taxpayer: Taxpayer): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Supprimer ce contribuable ?',
        message: `Cette action est irréversible pour ${this.displayName(taxpayer)} (NIF ${taxpayer.nif}).`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }
      this.taxpayerService.deleteTaxpayer(taxpayer.id).subscribe({
        next: () => this.snackBar.open('Contribuable supprimé.', 'Fermer', { duration: 3000 }),
        error: () =>
          this.snackBar.open('Échec de la suppression. Réessayez.', 'Fermer', { duration: 4000 }),
      });
    });
  }
}
