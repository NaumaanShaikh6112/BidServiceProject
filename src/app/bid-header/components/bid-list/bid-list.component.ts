// =================== MAIN LIST COMPONENT ===================

import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Import Animations (from helper file)
import { rowAnimations, fadeAnimations } from './helpers/bid-list.animations';

// Import Service
import { BidHeaderService } from '../../services/bid-header.service';

// Import Helper Functions
import { createFilterPredicate } from './helpers/bid-list.filters';
import { exportCSV, exportExcel, exportPDF } from './helpers/bid-list.exports';


// ===== STATUS TIMELINE DIALOG (KEEPING IT HERE FOR SIMPLICITY) =====
@Component({
  selector: 'app-bid-status-timeline-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule],
  template: `
    <div class="status-dialog">
      <div class="status-dialog-header">
        <h2>Bid Status Timeline</h2>
        <button mat-icon-button mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div class="status-dialog-body">
        <p class="bid-id">Bid No: <strong>{{ data?.bidNo }}</strong></p>
        <div class="timeline">
          <div class="timeline-item" *ngFor="let step of data?.timeline">
            <div class="dot" [class.active]="step.isCurrent"></div>
            <div class="content">
              <div class="row-1">
                <span class="label">{{ step.label }}</span>
                <span class="date">{{ step.date | date:'MMM dd, yyyy, HH:mm' }}</span>
              </div>
              <div class="row-2" *ngIf="step.user">
                <mat-icon>person</mat-icon>
                <span>{{ step.user }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* CSS styles from previous message */
    .status-dialog { min-width: 420px; max-width: 540px; }
    .status-dialog-header { display:flex; align-items:center; justify-content:space-between; padding:8px 4px 12px; border-bottom:1px solid #e5e7eb; }
    .status-dialog-header h2 { margin:0; font-size:18px; font-weight:600; color:#111827; }
    .status-dialog-body { padding-top:8px; }
    .bid-id { margin-bottom:12px; color:#4b5563; font-size:14px; }
    .timeline { position:relative; padding-left:18px; }
    .timeline::before { content:''; position:absolute; left:6px; top:0; bottom:0; width:2px; background:#e5e7eb; }
    .timeline-item { display:flex; margin-bottom:14px; }
    .dot { width:12px; height:12px; border-radius:999px; border:2px solid #9ca3af; background:#fff; margin-right:10px; margin-top:4px; }
    .dot.active { border-color:#2563eb; background:#2563eb; box-shadow:0 0 0 4px rgba(37,99,235,0.15); }
    .content { flex:1; }
    .row-1 { display:flex; justify-content:space-between; font-size:13px; margin-bottom:3px; }
    .label { font-weight:600; color:#111827; }
    .date { color:#6b7280; }
    .row-2 { display:flex; align-items:center; gap:4px; color:#6b7280; font-size:12px; }
    .row-2 mat-icon { font-size:16px; width:16px; height:16px; }
  `]
})
export class BidStatusTimelineDialogComponent {
  data = inject(MAT_DIALOG_DATA) as any;
}

// =================== BID LIST COMPONENT (CLEAN) ===================

@Component({
  selector: 'app-bid-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDividerModule,
    MatPaginatorModule, MatSortModule, MatMenuModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, MatDialogModule
  ],
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss'],
  animations: [
    rowAnimations[0], // detailExpand
    fadeAnimations[0]  // fadeIn
  ]
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
    // Inject the helper function for the filter logic
    this.dataSource.filterPredicate = createFilterPredicate();

    this.loadData();
  }

  // Load API data
  loadData(): void {
    this.service.getAll().subscribe({
      next: (res: any) => {
        const list = res?.data ?? res ?? [];
        this.dataSource.data = list;

        // paginator/sort after data arrives
        if (this.paginator) { this.dataSource.paginator = this.paginator; }
        if (this.sort) { this.dataSource.sort = this.sort; }

        // load saved filters AFTER data
        this.loadFiltersFromStorage();
        this.applyCombinedFilter(false);
      },
      error: (err: any) => {
        console.error('API Error:', err);
      }
    });
  }

  // -------- FILTER HANDLERS (Minimal Logic) --------
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
      dateFrom: this.dateFrom ? this.dateFrom.toISOString() : '',
      dateTo: this.dateTo ? this.dateTo.toISOString() : ''
    };

    this.dataSource.filter = JSON.stringify(filterValues);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    if (save) {
      this.saveFiltersToStorage(filterValues);
    }
  }

  private saveFiltersToStorage(values: any) {
    try {
      localStorage.setItem(this.FILTER_STORAGE_KEY, JSON.stringify(values));
    } catch { /* ignore */ }
  }

  private loadFiltersFromStorage() {
    try {
      const raw = localStorage.getItem(this.FILTER_STORAGE_KEY);
      if (!raw) { return; }
      const f = JSON.parse(raw);
      this.searchText = f.search || '';
      this.statusFilter = f.status || null;
      this.vendorFilter = f.vendor || '';
      this.dateFrom = f.dateFrom ? new Date(f.dateFrom) : null;
      this.dateTo = f.dateTo ? new Date(f.dateTo) : null;
    } catch { /* ignore */ }
  }

  // --------- ROW DETAIL (EXPAND CARD) ----------
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

    this.dialog.open(BidStatusTimelineDialogComponent, {
      data: {
        bidNo: row.bidNo,
        timeline: timelineMock
      },
      panelClass: 'status-timeline-dialog-panel'
    });
  }

  // -------- EXPORT HELPERS (Calling external functions) -------------
  private getCurrentTableData(): any[] {
    return this.dataSource.filteredData ?? this.dataSource.data ?? [];
  }

  exportToCSV() {
    exportCSV(this.getCurrentTableData()); // Calls helper
  }

  exportToExcel() {
    exportExcel(this.getCurrentTableData()); // Calls helper
  }

  exportToPDF() {
    exportPDF(this.getCurrentTableData()); // Calls helper
  }

  // -------- CRUD + NAVIGATION --------
  createNew() {
    if (!this.canCreate) { return; }
    this.router.navigate(['/bid-header/new']);
  }

  edit(row: any): void {
    if (!this.canEdit) { return; }
    this.router.navigate(['/bid-header/edit', row.id]);
  }

  delete(id: string): void {
    if (!this.canDelete) { return; }

    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }

    this.service.delete(id).subscribe({
      next: () => {
        alert('Deleted Successfully');
        // Use setTimeout for NG0100 fix (though loadData() is synchronous here, good practice to keep)
        setTimeout(() => { this.loadData(); }, 0);
      },
      error: (err: any) => {
        console.error('Delete Error:', err);
      }
    });
  }
}
