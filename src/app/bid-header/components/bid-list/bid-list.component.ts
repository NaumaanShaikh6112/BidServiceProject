import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { BidHeaderService } from '../../services/bid-header.service';

@Component({
  selector: 'app-bid-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss'],
})
export class BidListComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'indentNo',
    'vendorName',
    'bidNo',
    'bidDate',
    'status',
    'version',
    'action'
  ];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: BidHeaderService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadData();
    }, 0);
  }

  loadData(): void {
    this.service.getAll().subscribe({
      next: (res: any) => {
        const list = res?.data ?? res;
        this.dataSource = new MatTableDataSource(list);

        // binding paginator + sort
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // custom filter (search on any field)
        this.dataSource.filterPredicate = (data, filter) => {
          const term = filter.trim().toLowerCase();
          return (
            data.id?.toString().includes(term) ||
            data.indentNo?.toLowerCase().includes(term) ||
            data.vendorName?.toLowerCase().includes(term) ||
            data.bidNo?.toLowerCase().includes(term) ||
            data.status?.toLowerCase().includes(term)
          );
        };
      },
      error: (err: any) => {
        console.error('API Error:', err);
      }
    });
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createNew() {
    this.router.navigate(['/bid-header/new']);
  }

  edit(row: any) {
    this.router.navigate(['/bid-header/edit', row.id]);
  }

  delete(id: string): void {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.service.delete(id).subscribe({
      next: () => {
        alert('Deleted Successfully');
        this.loadData();
      },
      error: (err) => console.error('Delete Error:', err),
    });
  }
}
