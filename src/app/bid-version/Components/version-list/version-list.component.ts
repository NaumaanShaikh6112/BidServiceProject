import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MATERIAL } from '../../../shared/material';

// 🔥 GLOBAL HELPERS
import {
  tableAnimations,
  createGlobalFilterPredicate,
  exportCSV,
  exportExcel,
  exportPDF
} from '../../../shared/components';

import { BidVersionService } from '../../services/bid-version.service';

@Component({
  selector: 'app-version-list',
  standalone: true,
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.scss'],
  imports: [CommonModule, RouterModule, ...MATERIAL],
  animations: tableAnimations
})
export class VersionListComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'indentNo',
    'vendorName',
    'bidNo',
    'version',
    'offeredPrice',
    'negotiatedPrice',
    'action'
  ];

  dataSource = new MatTableDataSource<any>([]);
  searchText = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private service = inject(BidVersionService);
  private router = inject(Router);

  ngOnInit(): void {
    this.dataSource.filterPredicate = createGlobalFilterPredicate([
      'indentNo', 'vendorName', 'bidNo'
    ]);

    this.loadData();
  }

  loadData() {
    this.service.getAll().subscribe({
      next: (res: any) => {
        const list = res?.data ?? res ?? [];
        this.dataSource.data = list;

        if (this.paginator) this.dataSource.paginator = this.paginator;
        if (this.sort) this.dataSource.sort = this.sort;
      }
    });
  }

  // 🔍 SEARCH
  onSearchChange(text: string) {
    this.searchText = text.toLowerCase().trim();
    this.dataSource.filter = JSON.stringify({ search: this.searchText });
  }

  // ➕ CREATE
  createNew() {
    this.router.navigate(['/bid-version/new']);
  }

  // ✏️ EDIT
  edit(row: any) {
    this.router.navigate(['/bid-version/edit', row.id]);
  }

  // 🗑 DELETE
  delete(id: string) {
    if (!confirm('Delete this version?')) return;

    this.service.delete(id).subscribe(() => this.loadData());
  }

  // 📤 EXPORTS
  get currentTableData() {
    return this.dataSource.filteredData ?? this.dataSource.data ?? [];
  }

  exportToCSV() {
    exportCSV(this.currentTableData);
  }

  exportToExcel() {
    exportExcel(this.currentTableData);
  }

  exportToPDF() {
    exportPDF(this.currentTableData, undefined, 'Bid Version List');
  }
}
