// // //OPTIONAL
// // import { Component, OnInit, ViewChild, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { Router, RouterModule } from '@angular/router';

// // import { MatCardModule } from '@angular/material/card';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatTableModule, MatTableDataSource } from '@angular/material/table';
// // import { MatIconModule } from '@angular/material/icon';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatTooltipModule } from '@angular/material/tooltip';
// // import { MatDividerModule } from '@angular/material/divider';
// // import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// // import { MatSort, MatSortModule } from '@angular/material/sort';
// // import { MatMenuModule } from '@angular/material/menu';
// // import { MatSelectModule } from '@angular/material/select';
// // import { MatDatepickerModule } from '@angular/material/datepicker';
// // import { MatNativeDateModule } from '@angular/material/core';
// // import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

// // import { animate, state, style, transition, trigger } from '@angular/animations';

// // import { BidHeaderService } from '../../services/bid-header.service';

// // // ===== STATUS TIMELINE DIALOG (SMALL COMPONENT) =====
// // @Component({
// //   selector: 'app-bid-status-timeline-dialog',
// //   standalone: true,
// //   imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule],
// //   template: `
// //     <div class="status-dialog">
// //       <div class="status-dialog-header">
// //         <h2>Bid Status Timeline</h2>
// //         <button mat-icon-button mat-dialog-close>
// //           <mat-icon>close</mat-icon>
// //         </button>
// //       </div>

// //       <div class="status-dialog-body">
// //         <p class="bid-id">Bid No: <strong>{{ data?.bidNo }}</strong></p>

// //         <div class="timeline">
// //           <div class="timeline-item" *ngFor="let step of data?.timeline">
// //             <div class="dot" [class.active]="step.isCurrent"></div>
// //             <div class="content">
// //               <div class="row-1">
// //                 <span class="label">{{ step.label }}</span>
// //                 <span class="date">{{ step.date | date:'MMM dd, yyyy, HH:mm' }}</span>
// //               </div>
// //               <div class="row-2" *ngIf="step.user">
// //                 <mat-icon>person</mat-icon>
// //                 <span>{{ step.user }}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   `,
// //   styles: [`
// //     .status-dialog {
// //       min-width: 420px;
// //       max-width: 540px;
// //     }
// //     .status-dialog-header {
// //       display:flex;
// //       align-items:center;
// //       justify-content:space-between;
// //       padding:8px 4px 12px;
// //       border-bottom:1px solid #e5e7eb;
// //     }
// //     .status-dialog-header h2 {
// //       margin:0;
// //       font-size:18px;
// //       font-weight:600;
// //       color:#111827;
// //     }
// //     .status-dialog-body {
// //       padding-top:8px;
// //     }
// //     .bid-id {
// //       margin-bottom:12px;
// //       color:#4b5563;
// //       font-size:14px;
// //     }
// //     .timeline {
// //       position:relative;
// //       padding-left:18px;
// //     }
// //     .timeline::before {
// //       content:'';
// //       position:absolute;
// //       left:6px;
// //       top:0;
// //       bottom:0;
// //       width:2px;
// //       background:#e5e7eb;
// //     }
// //     .timeline-item {
// //       display:flex;
// //       margin-bottom:14px;
// //     }
// //     .dot {
// //       width:12px;
// //       height:12px;
// //       border-radius:999px;
// //       border:2px solid #9ca3af;
// //       background:#fff;
// //       margin-right:10px;
// //       margin-top:4px;
// //     }
// //     .dot.active {
// //       border-color:#2563eb;
// //       background:#2563eb;
// //       box-shadow:0 0 0 4px rgba(37,99,235,0.15);
// //     }
// //     .content {
// //       flex:1;
// //     }
// //     .row-1 {
// //       display:flex;
// //       justify-content:space-between;
// //       font-size:13px;
// //       margin-bottom:3px;
// //     }
// //     .label {
// //       font-weight:600;
// //       color:#111827;
// //     }
// //     .date {
// //       color:#6b7280;
// //     }
// //     .row-2 {
// //       display:flex;
// //       align-items:center;
// //       gap:4px;
// //       color:#6b7280;
// //       font-size:12px;
// //     }
// //     .row-2 mat-icon {
// //       font-size:16px;
// //       width:16px;
// //       height:16px;
// //     }
// //   `]
// // })
// // export class BidStatusTimelineDialogComponent {
// //   data = inject(MAT_DIALOG_DATA) as any;
// // }

// // // =================== MAIN LIST COMPONENT ===================

// // @Component({
// //   selector: 'app-bid-list',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     RouterModule,

// //     MatCardModule,
// //     MatFormFieldModule,
// //     MatInputModule,
// //     MatTableModule,
// //     MatIconModule,
// //     MatButtonModule,
// //     MatTooltipModule,
// //     MatDividerModule,
// //     MatPaginatorModule,
// //     MatSortModule,
// //     MatMenuModule,
// //     MatSelectModule,
// //     MatDatepickerModule,
// //     MatNativeDateModule,
// //     MatDialogModule
// //   ],
// //   templateUrl: './bid-list.component.html',
// //   styleUrls: ['./bid-list.component.scss'],
// //   animations: [
// //     trigger('detailExpand', [
// //       state('collapsed', style({ height: '0px', opacity: 0, padding: '0 24px' })),
// //       state('expanded', style({ height: '*', opacity: 1, padding: '16px 24px 20px' })),
// //       transition('collapsed <=> expanded', animate('220ms cubic-bezier(0.4,0,0.2,1)')),
// //     ]),
// //     trigger('fadeIn', [
// //       transition(':enter', [
// //         style({ opacity: 0, transform: 'translateY(4px)' }),
// //         animate('220ms ease-out',
// //           style({ opacity: 1, transform: 'translateY(0)' })
// //         )
// //       ])
// //     ])
// //   ]
// // })
// // export class BidListComponent implements OnInit {

// //   // ------- TABLE -------------
// //   displayedColumns: string[] = [
// //     'id',
// //     'indentNo',
// //     'vendorName',
// //     'bidNo',
// //     'bidDate',
// //     'status',
// //     'version',
// //     'action'
// //   ];

// //   dataSource = new MatTableDataSource<any>([]);
// //   expandedRow: any | null = null;

// //   @ViewChild(MatPaginator) paginator!: MatPaginator;
// //   @ViewChild(MatSort) sort!: MatSort;

// //   // ------- FILTERS -------------
// //   searchText = '';
// //   statusFilter: string | null = null;
// //   vendorFilter = '';
// //   dateFrom: Date | null = null;
// //   dateTo: Date | null = null;
// //   isFilterPanelOpen = false;

// //   private FILTER_STORAGE_KEY = 'bidHeaderListFilters';

// //   // ------- ROLE BASED (demo) -------------
// //   userRole: 'admin' | 'viewer' = 'admin'; // TODO: hook from auth service

// //   get canCreate() { return this.userRole === 'admin'; }
// //   get canEdit() { return this.userRole === 'admin'; }
// //   get canDelete() { return this.userRole === 'admin'; }

// //   // ------- DI SERVICES -------------
// //   private service = inject(BidHeaderService);
// //   private router = inject(Router);
// //   private dialog = inject(MatDialog);

// //   ngOnInit(): void {
// //     // custom filter logic
// //     this.dataSource.filterPredicate = (data, filterJson) => {
// //       if (!filterJson) { return true; }
// //       const f = JSON.parse(filterJson || '{}');

// //       const search = (f.search || '').toLowerCase();
// //       const vendor = (f.vendor || '').toLowerCase();
// //       const status = (f.status || '').toLowerCase();
// //       const from = f.dateFrom ? new Date(f.dateFrom) : null;
// //       const to = f.dateTo ? new Date(f.dateTo) : null;

// //       const combined = (
// //         (data.id || '') +
// //         (data.indentNo || '') +
// //         (data.vendorName || '') +
// //         (data.bidNo || '') +
// //         (data.status || '')
// //       ).toLowerCase();

// //       const matchesSearch = !search || combined.includes(search);
// //       const matchesVendor = !vendor || (data.vendorName || '').toLowerCase().includes(vendor);
// //       const matchesStatus = !status || (data.status || '').toLowerCase() === status;

// //       let matchesDate = true;
// //       if (from || to) {
// //         const bidDate = data.bidDate ? new Date(data.bidDate) : null;
// //         if (bidDate) {
// //           if (from && bidDate < from) { matchesDate = false; }
// //           if (to) {
// //             const toEnd = new Date(to);
// //             toEnd.setHours(23, 59, 59, 999);
// //             if (bidDate > toEnd) { matchesDate = false; }
// //           }
// //         }
// //       }

// //       return matchesSearch && matchesVendor && matchesStatus && matchesDate;
// //     };

// //     this.loadData();
// //   }

// //   // Load API data
// //   loadData(): void {
// //     this.service.getAll().subscribe({
// //       next: (res: any) => {
// //         const list = res?.data ?? res ?? [];
// //         this.dataSource.data = list;

// //         // paginator/sort after data arrives
// //         if (this.paginator) {
// //           this.dataSource.paginator = this.paginator;
// //         }
// //         if (this.sort) {
// //           this.dataSource.sort = this.sort;
// //         }

// //         // load saved filters AFTER data
// //         this.loadFiltersFromStorage();
// //         this.applyCombinedFilter(false);
// //       },
// //       error: (err: any) => {
// //         console.error('API Error:', err);
// //       }
// //     });
// //   }

// //   // -------- FILTER HANDLERS --------
// //   onSearchChange(value: string) {
// //     this.searchText = value;
// //     this.applyCombinedFilter();
// //   }

// //   onStatusChange(value: string | null) {
// //     this.statusFilter = value;
// //     this.applyCombinedFilter();
// //   }

// //   onVendorChange(value: string) {
// //     this.vendorFilter = value;
// //     this.applyCombinedFilter();
// //   }

// //   onDateFromChange(value: Date | null) {
// //     this.dateFrom = value;
// //     this.applyCombinedFilter();
// //   }

// //   onDateToChange(value: Date | null) {
// //     this.dateTo = value;
// //     this.applyCombinedFilter();
// //   }

// //   toggleFilterPanel() {
// //     this.isFilterPanelOpen = !this.isFilterPanelOpen;
// //   }

// //   resetFilters() {
// //     this.searchText = '';
// //     this.statusFilter = null;
// //     this.vendorFilter = '';
// //     this.dateFrom = null;
// //     this.dateTo = null;
// //     this.applyCombinedFilter();
// //   }

// //   private applyCombinedFilter(save = true) {
// //     const filterValues = {
// //       search: this.searchText?.trim().toLowerCase() || '',
// //       status: this.statusFilter || '',
// //       vendor: this.vendorFilter?.trim().toLowerCase() || '',
// //       dateFrom: this.dateFrom ? this.dateFrom.toISOString() : '',
// //       dateTo: this.dateTo ? this.dateTo.toISOString() : ''
// //     };

// //     this.dataSource.filter = JSON.stringify(filterValues);

// //     if (this.dataSource.paginator) {
// //       this.dataSource.paginator.firstPage();
// //     }

// //     if (save) {
// //       this.saveFiltersToStorage(filterValues);
// //     }
// //   }

// //   private saveFiltersToStorage(values: any) {
// //     try {
// //       localStorage.setItem(this.FILTER_STORAGE_KEY, JSON.stringify(values));
// //     } catch {
// //       // ignore
// //     }
// //   }

// //   private loadFiltersFromStorage() {
// //     try {
// //       const raw = localStorage.getItem(this.FILTER_STORAGE_KEY);
// //       if (!raw) { return; }
// //       const f = JSON.parse(raw);
// //       this.searchText = f.search || '';
// //       this.statusFilter = f.status || null;
// //       this.vendorFilter = f.vendor || '';
// //       this.dateFrom = f.dateFrom ? new Date(f.dateFrom) : null;
// //       this.dateTo = f.dateTo ? new Date(f.dateTo) : null;
// //     } catch {
// //       // ignore
// //     }
// //   }

// //   // --------- ROW DETAIL (EXPAND CARD) ----------
// //   onRowClick(row: any) {
// //     this.expandedRow = this.expandedRow === row ? null : row;
// //   }

// //   // --------- STATUS TIMELINE POPUP ----------
// //   openStatusTimeline(row: any) {
// //     const timelineMock = [
// //       { label: 'Created', date: row.createdAt || row.bidDate || new Date(), user: 'System', isCurrent: false },
// //       { label: 'Submitted', date: row.submittedAt || new Date(), user: 'User A', isCurrent: row.status === 'submitted' },
// //       { label: 'Under Review', date: new Date(), user: 'Reviewer', isCurrent: row.status?.toLowerCase() === 'under_review' },
// //       { label: 'Approved', date: new Date(), user: 'Approver', isCurrent: row.status?.toLowerCase() === 'approved' }
// //     ];

// //     this.dialog.open(BidStatusTimelineDialogComponent, {
// //       data: {
// //         bidNo: row.bidNo,
// //         timeline: timelineMock
// //       },
// //       panelClass: 'status-timeline-dialog-panel'
// //     });
// //   }

// //   // -------- EXPORT HELPERS -------------
// //   private getCurrentTableData(): any[] {
// //     return this.dataSource.filteredData ?? this.dataSource.data ?? [];
// //   }

// //   exportToCSV() {
// //     const rows = this.getCurrentTableData();
// //     if (!rows.length) { return; }

// //     const header = ['ID', 'Indent No', 'Vendor', 'Bid No', 'Bid Date', 'Status', 'Version'];
// //     const csvRows = [
// //       header.join(',')
// //     ];

// //     for (const r of rows) {
// //       csvRows.push([
// //         `"${r.id}"`,
// //         `"${r.indentNo || ''}"`,
// //         `"${r.vendorName || ''}"`,
// //         `"${r.bidNo || ''}"`,
// //         `"${r.bidDate ? new Date(r.bidDate).toLocaleDateString() : ''}"`,
// //         `"${r.status || ''}"`,
// //         `"${r.version ?? ''}"`
// //       ].join(','));
// //     }

// //     const blob = new Blob([csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
// //     const url = window.URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = 'vendor-bid-list.csv';
// //     a.click();
// //     window.URL.revokeObjectURL(url);
// //   }

// //   async exportToExcel() {
// //     const rows = this.getCurrentTableData();
// //     if (!rows.length) { return; }

// //     // Expecting xlsx installed: npm i xlsx file-saver
// //     const xlsx = await import('xlsx');
// //     const worksheetData = rows.map(r => ({
// //       ID: r.id,
// //       'Indent No': r.indentNo,
// //       Vendor: r.vendorName,
// //       'Bid No': r.bidNo,
// //       'Bid Date': r.bidDate ? new Date(r.bidDate).toLocaleDateString() : '',
// //       Status: r.status,
// //       Version: r.version
// //     }));

// //     const ws = xlsx.utils.json_to_sheet(worksheetData);
// //     const wb = xlsx.utils.book_new();
// //     xlsx.utils.book_append_sheet(wb, ws, 'BidHeaders');
// //     const wbout = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });

// //     const blob = new Blob([wbout], { type: 'application/octet-stream' });
// //     const url = window.URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = 'vendor-bid-list.xlsx';
// //     a.click();
// //     window.URL.revokeObjectURL(url);
// //   }

// //   async exportToPDF() {
// //     const rows = this.getCurrentTableData();
// //     if (!rows.length) { return; }

// //     // Expecting jsPDF + autotable: npm i jspdf jspdf-autotable
// //     const jsPDF = (await import('jspdf')).default;
// //     const autoTable = (await import('jspdf-autotable')).default;

// //     const doc = new jsPDF('l', 'pt', 'a4');
// //     doc.setFontSize(14);
// //     doc.text('Vendor Bid List', 40, 40);

// //     const body = rows.map(r => [
// //       r.id,
// //       r.indentNo,
// //       r.vendorName,
// //       r.bidNo,
// //       r.bidDate ? new Date(r.bidDate).toLocaleDateString() : '',
// //       r.status,
// //       r.version
// //     ]);

// //     autoTable(doc, {
// //       startY: 60,
// //       head: [['ID', 'Indent No', 'Vendor', 'Bid No', 'Bid Date', 'Status', 'Version']],
// //       body
// //     });

// //     doc.save('vendor-bid-list.pdf');
// //   }

// //   // -------- CRUD + NAVIGATION --------
// //   createNew() {
// //     if (!this.canCreate) { return; }
// //     this.router.navigate(['/bid-header/new']);
// //   }

// //   edit(row: any): void {
// //     if (!this.canEdit) { return; }
// //     this.router.navigate(['/bid-header/edit', row.id]);
// //   }

// //   delete(id: string): void {
// //     if (!this.canDelete) { return; }

// //     if (!confirm('Are you sure you want to delete this record?')) {
// //       return;
// //     }

// //     this.service.delete(id).subscribe({
// //       next: () => {
// //         alert('Deleted Successfully');
// //         this.loadData();
// //       },
// //       error: (err: any) => {
// //         console.error('Delete Error:', err);
// //       }
// //     });
// //   }
// // }



// <mat-card class="table-card glass-card fade-in" [@fadeIn]>
//   <mat-card-header class="card-header">
//     <div class="card-title-wrapper">
//       <mat-icon class="card-icon">table_chart</mat-icon>
//       <mat-card-title class="card-title">Vendor-Bid-List</mat-card-title>
//     </div>

//     <div class="table-actions">
//       <!-- Export Menu -->
//       <button mat-icon-button [matMenuTriggerFor]="exportMenu" matTooltip="Export">
//         <mat-icon>download</mat-icon>
//       </button>
//       <mat-menu #exportMenu="matMenu">
//         <button mat-menu-item (click)="exportToCSV()">
//           <mat-icon>table_view</mat-icon>
//           <span>Export CSV</span>
//         </button>
//         <button mat-menu-item (click)="exportToExcel()">
//           <mat-icon>grid_on</mat-icon>
//           <span>Export Excel</span>
//         </button>
//         <button mat-menu-item (click)="exportToPDF()">
//           <mat-icon>picture_as_pdf</mat-icon>
//           <span>Export PDF</span>
//         </button>
//       </mat-menu>

//       <!-- Filter drawer toggle -->
//       <button mat-icon-button class="filter-btn" matTooltip="Advanced Filters"
//               (click)="toggleFilterPanel()">
//         <mat-icon>filter_alt</mat-icon>
//       </button>

//       <!-- Search -->
//       <mat-form-field appearance="outline" class="search-field">
//         <mat-label>Search</mat-label>
//         <input matInput placeholder="Search bids..."
//                [value]="searchText"
//                (keyup)="onSearchChange($event.target.value)">
//         <mat-icon matPrefix>search</mat-icon>
//       </mat-form-field>

//       <!-- Create New -->
//       <button mat-raised-button color="primary" class="btn-primary"
//               (click)="createNew()" *ngIf="canCreate">
//         <mat-icon>add</mat-icon>
//         Create New
//       </button>
//     </div>
//   </mat-card-header>

//   <mat-card-content class="card-content">
//     <div class="table-container">
//       <table mat-table [dataSource]="dataSource" matSort class="modern-table">

//         <!-- ID -->
//         <ng-container matColumnDef="id">
//           <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
//           <td mat-cell *matCellDef="let row">
//             <span class="id-badge">{{ row.id }}</span>
//           </td>
//         </ng-container>

//         <!-- Indent -->
//         <ng-container matColumnDef="indentNo">
//           <th mat-header-cell *matHeaderCellDef mat-sort-header>INDENT NO</th>
//           <td mat-cell *matCellDef="let row">{{ row.indentNo }}</td>
//         </ng-container>

//         <!-- Vendor -->
//         <ng-container matColumnDef="vendorName">
//           <th mat-header-cell *matHeaderCellDef mat-sort-header>VENDOR</th>
//           <td mat-cell *matCellDef="let row">
//             <div class="vendor-cell">
//               <mat-icon class="vendor-icon">business</mat-icon>
//               <span>{{ row.vendorName }}</span>
//             </div>
//           </td>
//         </ng-container>

//         <!-- Bid No -->
//         <ng-container matColumnDef="bidNo">
//           <th mat-header-cell *matHeaderCellDef mat-sort-header>BID NO</th>
//           <td mat-cell *matCellDef="let row">
//             <strong>{{ row.bidNo }}</strong>
//           </td>
//         </ng-container>

//         <!-- Date -->
//         <ng-container matColumnDef="bidDate">
//           <th mat-header-cell *matHeaderCellDef mat-sort-header>BID DATE</th>
//           <td mat-cell *matCellDef="let row">{{ row.bidDate | date:'MMM dd, yyyy' }}</td>
//         </ng-container>

//         <!-- Status -->
//         <ng-container matColumnDef="status">
//           <th mat-header-cell *matHeaderCellDef mat-sort-header>STATUS</th>
//           <td mat-cell *matCellDef="let row">
//             <span class="status-badge"
//                   [ngClass]="'status-' + row.status?.toLowerCase()"
//                   (click)="openStatusTimeline(row)">
//               {{ row.status }}
//             </span>
//           </td>
//         </ng-container>

//         <!-- Version -->
//         <ng-container matColumnDef="version">
//           <th mat-header-cell *matHeaderCellDef mat-sort-header>VERSION</th>
//           <td mat-cell *matCellDef="let row">
//             <!-- Simple dropdown demo, you can replace with real versions -->
//             <button mat-stroked-button class="version-chip" [matMenuTriggerFor]="versionMenu">
//               v{{ row.version || 1 }}
//               <mat-icon>expand_more</mat-icon>
//             </button>
//           </td>
//         </ng-container>

//         <mat-menu #versionMenu="matMenu">
//           <button mat-menu-item>
//             <span>v1 (Current)</span>
//           </button>
//           <button mat-menu-item disabled>
//             <span>v0 (History)</span>
//           </button>
//         </mat-menu>

//         <!-- Actions -->
//         <ng-container matColumnDef="action">
//           <th mat-header-cell *matHeaderCellDef>ACTIONS</th>
//           <td mat-cell *matCellDef="let row">
//             <div class="action-buttons">
//               <button mat-icon-button color="primary" class="action-btn-icon"
//                       (click)="edit(row)" matTooltip="Edit" *ngIf="canEdit">
//                 <mat-icon>edit</mat-icon>
//               </button>

//               <button mat-icon-button color="warn" class="action-btn-icon"
//                       (click)="delete(row.id)" matTooltip="Delete" *ngIf="canDelete">
//                 <mat-icon>delete</mat-icon>
//               </button>
//             </div>
//           </td>
//         </ng-container>

//         <!-- HEADER + ROW -->
//         <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
//         <tr mat-row
//             *matRowDef="let row; columns: displayedColumns;"
//             class="table-row"
//             [class.row-expanded]="expandedRow === row"
//             (click)="onRowClick(row)">
//         </tr>
//       </table>

//       <mat-paginator [pageSizeOptions]="[5, 10, 20, 50]"
//                      showFirstLastButtons>
//       </mat-paginator>
//     </div>

//     <!-- Detail Card (Row Expansion) -->
//     <div class="detail-card-wrapper" *ngIf="expandedRow" [@detailExpand]="expandedRow ? 'expanded' : 'collapsed'">
//       <div class="detail-card">
//         <div class="detail-header">
//           <div class="left">
//             <h3>{{ expandedRow.bidNo }} – {{ expandedRow.vendorName }}</h3>
//             <p>Indent: {{ expandedRow.indentNo }} • Bid Date: {{ expandedRow.bidDate | date:'MMM dd, yyyy' }}</p>
//           </div>
//           <div class="right">
//             <span class="status-badge" [ngClass]="'status-' + expandedRow.status?.toLowerCase()">
//               {{ expandedRow.status }}
//             </span>
//           </div>
//         </div>

//         <div class="detail-grid">
//           <div class="detail-item">
//             <label>Vendor ID</label>
//             <span>{{ expandedRow.vendorId }}</span>
//           </div>
//           <div class="detail-item">
//             <label>Contact Person</label>
//             <span>{{ expandedRow.contactPerson }}</span>
//           </div>
//           <div class="detail-item">
//             <label>Mobile</label>
//             <span>{{ expandedRow.mobileNo }}</span>
//           </div>
//           <div class="detail-item">
//             <label>Factory Code</label>
//             <span>{{ expandedRow.factoryCode }}</span>
//           </div>
//           <div class="detail-item">
//             <label>Assigned User</label>
//             <span>{{ expandedRow.assignedUserId }}</span>
//           </div>
//           <div class="detail-item">
//             <label>Version</label>
//             <span>v{{ expandedRow.version }}</span>
//           </div>
//         </div>
//       </div>
//     </div>

//     <!-- Empty State -->
//     <div class="empty-state" *ngIf="dataSource.data.length === 0">
//       <mat-icon>inbox</mat-icon>
//       <h3>No Bid Headers Found</h3>
//       <p>Click "Create New" to add your first record.</p>
//       <button mat-raised-button color="primary" (click)="createNew()" *ngIf="canCreate">
//         <mat-icon>add</mat-icon>
//         Create New
//       </button>
//     </div>

//     <!-- FILTER PANEL (SLIDE RIGHT) -->
//     <div class="filter-panel" [class.open]="isFilterPanelOpen">
//       <div class="filter-header">
//         <h3>Advanced Filters</h3>
//         <button mat-icon-button (click)="toggleFilterPanel()">
//           <mat-icon>close</mat-icon>
//         </button>
//       </div>

//       <div class="filter-body">
//         <mat-form-field appearance="outline">
//           <mat-label>Status</mat-label>
//           <mat-select [value]="statusFilter" (selectionChange)="onStatusChange($event.value)">
//             <mat-option [value]="null">All</mat-option>
//             <mat-option value="draft">Draft</mat-option>
//             <mat-option value="submitted">Submitted</mat-option>
//             <mat-option value="under_review">Under Review</mat-option>
//             <mat-option value="approved">Approved</mat-option>
//             <mat-option value="rejected">Rejected</mat-option>
//           </mat-select>
//         </mat-form-field>

//         <mat-form-field appearance="outline">
//           <mat-label>Vendor</mat-label>
//           <input matInput [value]="vendorFilter" (keyup)="onVendorChange($event.target.value)">
//         </mat-form-field>

//         <div class="date-row">
//           <mat-form-field appearance="outline">
//             <mat-label>Bid Date From</mat-label>
//             <input matInput [matDatepicker]="fromPicker" [value]="dateFrom" (dateChange)="onDateFromChange($event.value)">
//             <mat-datepicker-toggle matIconSuffix [for]="fromPicker"></mat-datepicker-toggle>
//             <mat-datepicker #fromPicker></mat-datepicker>
//           </mat-form-field>

//           <mat-form-field appearance="outline">
//             <mat-label>Bid Date To</mat-label>
//             <input matInput [matDatepicker]="toPicker" [value]="dateTo" (dateChange)="onDateToChange($event.value)">
//             <mat-datepicker-toggle matIconSuffix [for]="toPicker"></mat-datepicker-toggle>
//             <mat-datepicker #toPicker></mat-datepicker>
//           </mat-form-field>
//         </div>
//       </div>

//       <div class="filter-footer">
//         <button mat-stroked-button (click)="resetFilters()">
//           Clear Filters
//         </button>
//         <button mat-raised-button color="primary" (click)="toggleFilterPanel()">
//           Apply
//         </button>
//       </div>
//     </div>

//   </mat-card-content>
// </mat-card>

// <!-- Floating FAB for Create New -->
// <button mat-fab color="primary" class="fab-create" (click)="createNew()" *ngIf="canCreate">
//   <mat-icon>add</mat-icon>
// </button>
