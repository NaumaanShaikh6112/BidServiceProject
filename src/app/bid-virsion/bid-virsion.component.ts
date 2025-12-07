import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BidVirsionService } from './services/bid-virsion.service';

@Component({
  selector: 'app-bid-version',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './bid-virsion.html',
  styleUrls: ['./bid-virsion.scss'],
})
export class BidVirsion implements OnInit {

  list1: any[] = [];
  displayedColumns: string[] = [
    'id', 'bidHeaderId', 'version', 'offeredPrice',
    'negotiatedPrice', 'negotiatedGstPercentage',
    'negotiatedDiscountPercentage', 'action'
  ];

  form!: FormGroup;
  isEdit = false;
  editId: string | null = null;
  showDialog = false; // Dialog visibility control

  constructor(
    private service: BidVirsionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadData();
  }

  /** Build Reactive Form */
  private buildForm(): void {
    this.form = this.fb.group({
      id: [''],
      bidHeaderId: ['', Validators.required],
      version: [1, Validators.required],
      offeredPrice: [0, Validators.required],
      negotiatedPrice: [0],
      negotiatedGstPercentage: [0],
      negotiatedDiscountPercentage: [0],
      negotiatedPackingAmount: [0],
      negotiatedDeliveryTerms: [''],
      negotiatedPaymentTerms: [''],
      negotiatedDeliveryPeriod: [''],
      negotiatedFreightCharges: [0],
      negotiatedBasicAmount: [0],
      negotiatedTotalAmount: [0],
      negotiatedLandedPrice: [0],
      negotiatedNetLandedCost: [0]
    });
  }

    // ⭐ Add this function
  trackById(index: number, item: any) {
    return item.id;
  }
  /** Load all records */
loadData() {
    this.service.getAll().subscribe({
      next: (res) => this.list1 = res,
      error: (err) => {
        console.error("API Error:", err);
        if (typeof window !== 'undefined') {
          alert("API NOT WORKING OR URL WRONG");
        }
      }
    });
  }

  /** Open dialog for create/edit */
  openDialog(item?: any): void {
    this.showDialog = true;
    this.isEdit = !!item;

    if (item) {
      this.editId = item.id;
      this.form.patchValue(item);
    } else {
      this.editId = null;
      this.form.reset({ version: 1, offeredPrice: 0 });
    }
  }

  /** Close dialog */
  closeDialog(): void {
    this.showDialog = false;
    this.editId = null;
    this.isEdit = false;
    this.form.reset({ version: 1, offeredPrice: 0 });
  }

  /** Save record (create/update) */
  save(): void {
    if (this.form.invalid) {
      alert("Please fill required fields.");
      return;
    }

    const body = this.form.value;

    if (this.isEdit && this.editId) {
      this.service.update(this.editId, body).subscribe({
        next: () => {
          alert("Record updated successfully!");
          this.closeDialog();
          this.loadData();
        },
        error: () => alert("Update failed!")
      });
    } else {
      this.service.create(body).subscribe({
        next: () => {
          alert("Record created successfully!");
          this.closeDialog();
          this.loadData();
        },
        error: () => alert("Create failed!")
      });
    }
  }

  /** Edit record */
  edit(item: any): void {
    this.openDialog(item);
  }

  /** Delete record */
  delete(id: string): void {
    if (!confirm("Are you sure?")) return;
    this.service.delete(id).subscribe({
      next: () => this.loadData(),
      error: () => alert("Delete failed!")
    });
  }
}
