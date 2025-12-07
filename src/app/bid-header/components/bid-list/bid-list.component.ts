import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

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
  ],
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss'],
})
export class BidListComponent implements OnInit {

  // yahi naam HTML me use kiya hai: [dataSource]="list1" COLUMNS DIKHANE
  list1: any[] = [];

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

  constructor(
    private service: BidHeaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Hydration / NG0100 error avoid karne ke liye
    setTimeout(() => {
      this.loadData();
    }, 0);
  }

  loadData(): void {
    this.service.getAll().subscribe({
      next: (res: any) => {
        this.list1 = res?.data ?? res;
      },
      error: (err: any) => {
        console.error('API Error:', err);
      }
    });
  }

  edit(row: any): void {
    // Ab edit button route se form page kholega
    this.router.navigate(['/bid-header/edit', row.id]);
  }

  delete(id: string): void {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }

    this.service.delete(id).subscribe({
      next: () => {
        alert('Deleted Successfully');
        this.loadData();
      },
      error: (err: any) => {
        console.error('Delete Error:', err);
      }
    });
  }
}
