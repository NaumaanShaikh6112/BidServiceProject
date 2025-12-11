import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { forkJoin } from 'rxjs';

import { MATERIAL } from '../../../shared/material';
import {
  tableAnimations,
  createGlobalFilterPredicate,
  exportCSV,
  exportExcel,
  exportPDF
} from '../../../shared/components';

import { BidVersionService } from '../../services/bid-version.service';
import { BidHeaderService } from '../../../bid-header/services/bid-header.service';

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
  private headerService = inject(BidHeaderService);
  private router = inject(Router);

  ngOnInit(): void {
    this.dataSource.filterPredicate = createGlobalFilterPredicate([
      'indentNo', 'vendorName', 'bidNo'
    ]);

    this.loadData();
  }

  loadData() {
    forkJoin({
      versions: this.service.getAll(),
      headers: this.headerService.getAll()
    }).subscribe(({ versions, headers }) => {

      // fast lookup map
      const headerMap = new Map<any, any>(headers.map((h: any) => [h.id, h]));

      const merged = versions.map((v: any) => {
        const h: any = headerMap.get(v.bidHeaderId);

        return {
          ...v,
          indentNo: h?.indentNo ?? '',
          vendorName: h?.vendorName ?? '',
          bidNo: h?.bidNo ?? ''
        };
      });

      this.dataSource.data = merged;

      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    });
  }

  onSearchChange(text: string) {
    this.searchText = text.toLowerCase().trim();
    this.dataSource.filter = JSON.stringify({ search: this.searchText });
  }

  createNew() {
    this.router.navigate(['/bid-version/new']);
  }

  edit(row: any) {
    this.router.navigate(['/bid-version/edit', row.id]);
  }

  delete(id: string) {
    if (!confirm('Delete this version?')) return;
    this.service.delete(id).subscribe(() => this.loadData());
  }

  get currentTableData() {
    return this.dataSource.filteredData ?? this.dataSource.data ?? [];
  }

  exportToCSV() { exportCSV(this.currentTableData); }
  exportToExcel() { exportExcel(this.currentTableData); }
  exportToPDF() { exportPDF(this.currentTableData, undefined, 'Bid Version List'); }
}
