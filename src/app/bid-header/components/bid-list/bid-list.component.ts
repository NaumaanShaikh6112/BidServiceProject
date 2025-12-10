// Angular Material Imports
import { MATERIAL } from '../../../shared/material';

import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// 🌍 GLOBAL REUSABLE UTILITIES
import {
  tableAnimations,
  createGlobalFilterPredicate,
  exportCSV,
  exportExcel,
  exportPDF,
  StatusTimelineComponent
} from '../../../shared/components';

import { BidHeaderService } from '../../services/bid-header.service';

@Component({
  selector: 'app-bid-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ...MATERIAL, MatDialogModule
  ],
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss'],
  animations: tableAnimations
})
export class BidListComponent implements OnInit {

  // ------- TABLE -------------
  displayedColumns: string[] = [
    'id', 'indentNo', 'vendorName', 'bidNo', 'bidDate', 'status', 'version', 'action'
  ];
  dataSource = new MatTableDataSource<any>([]);
  expandedRow: any | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // ------- FILTERS (STATE) -------------
  searchText = '';
  statusFilter: string | null = null;
  vendorFilter = '';
  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  isFilterPanelOpen = false;

  private FILTER_STORAGE_KEY = 'bidHeaderListFilters';

  // ------- ROLE BASED (demo) -------------
  userRole: 'admin' | 'viewer' = 'admin';

  get canCreate() { return this.userRole === 'admin'; }
  get canEdit() { return this.userRole === 'admin'; }
  get canDelete() { return this.userRole === 'admin'; }

  // ------- DI SERVICES -------------
  private service = inject(BidHeaderService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dataSource.filterPredicate = createGlobalFilterPredicate([
      'vendorName', 'bidNo', 'indentNo', 'status'
    ]);

    this.loadData();
  }

  // Load API data
  loadData(): void {
    this.service.getAll().subscribe({
      next: (res: any) => {
        const list = res?.data ?? res ?? [];
        this.dataSource.data = list;

        if (this.paginator) this.dataSource.paginator = this.paginator;
        if (this.sort) this.dataSource.sort = this.sort;

        this.loadFiltersFromStorage();
        this.applyCombinedFilter(false);
      }
    });
  }

  // -------- FILTER HANDLERS --------
  onSearchChange(value: string) { this.searchText = value; this.applyCombinedFilter(); }
  onStatusChange(value: string | null) { this.statusFilter = value; this.applyCombinedFilter(); }
  onVendorChange(value: string) { this.vendorFilter = value; this.applyCombinedFilter(); }
  onDateFromChange(value: Date | null) { this.dateFrom = value; this.applyCombinedFilter(); }
  onDateToChange(value: Date | null) { this.dateTo = value; this.applyCombinedFilter(); }

  toggleFilterPanel() {
    this.isFilterPanelOpen = !this.isFilterPanelOpen;
  }

  resetFilters() {
    this.searchText = '';
    this.statusFilter = null;
    this.vendorFilter = '';
    this.dateFrom = null;
    this.dateTo = null;
    this.applyCombinedFilter();
  }

  private applyCombinedFilter(save = true) {
    const filterValues = {
      search: this.searchText?.trim().toLowerCase() || '',
      status: this.statusFilter || '',
      vendor: this.vendorFilter?.trim().toLowerCase() || '',
      dateFrom: this.dateFrom?.toISOString() || '',
      dateTo: this.dateTo?.toISOString() || ''
    };

    this.dataSource.filter = JSON.stringify(filterValues);

    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
    if (save) this.saveFiltersToStorage(filterValues);
  }

  private saveFiltersToStorage(values: any) {
    if (typeof window === 'undefined') return;  // ⬅️ FIX

    localStorage.setItem(this.FILTER_STORAGE_KEY, JSON.stringify(values));
  }


  private loadFiltersFromStorage() {
    if (typeof window === 'undefined') return;  // ⬅️ FIX

    const raw = localStorage.getItem(this.FILTER_STORAGE_KEY);
    if (!raw) return;

    const f = JSON.parse(raw);
    this.searchText = f.search || '';
    this.statusFilter = f.status || null;
    this.vendorFilter = f.vendor || '';
    this.dateFrom = f.dateFrom ? new Date(f.dateFrom) : null;
    this.dateTo = f.dateTo ? new Date(f.dateTo) : null;
  }


  onRowClick(row: any) {
    this.expandedRow = this.expandedRow === row ? null : row;
  }

  // --------- STATUS TIMELINE POPUP ----------
  openStatusTimeline(row: any) {
    const timelineMock = [
      { label: 'Created', date: row.createdAt || row.bidDate || new Date(), user: 'System', isCurrent: false },
      { label: 'Submitted', date: row.submittedAt || new Date(), user: 'User A', isCurrent: row.status === 'submitted' },
      { label: 'Under Review', date: new Date(), user: 'Reviewer', isCurrent: row.status?.toLowerCase() === 'under_review' },
      { label: 'Approved', date: new Date(), user: 'Approver', isCurrent: row.status?.toLowerCase() === 'approved' }
    ];

    this.dialog.open(StatusTimelineComponent, {
      data: {
        refNo: row.bidNo,
        timeline: timelineMock
      },
      panelClass: 'status-timeline-dialog-panel'
    });
  }

  // -------- EXPORT HELPERS -------------
  private getCurrentTableData(): any[] {
    return this.dataSource.filteredData ?? this.dataSource.data ?? [];
  }

  exportToCSV() { exportCSV(this.getCurrentTableData()); }
  exportToExcel() { exportExcel(this.getCurrentTableData()); }
  exportToPDF() { exportPDF(this.getCurrentTableData()); }

  // -------- CRUD + NAVIGATION --------
  createNew() { if (this.canCreate) this.router.navigate(['/bid-header/new']); }
  edit(row: any) { if (this.canEdit) this.router.navigate(['/bid-header/edit', row.id]); }
  delete(id: string) {
    if (!this.canDelete) return;
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.service.delete(id).subscribe(() => this.loadData());
  }
}
