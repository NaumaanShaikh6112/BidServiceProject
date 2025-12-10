import { MATERIAL } from '../../../shared/material';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

// Helpers
import { createBidHeaderForm } from './helpers/form-factory';
import { splitDate, normalizePayload } from './helpers/date-helpers';
import {
  patchBidRecord,
  handleSuccess,
  handleDeleteSuccess,
  handleError
} from './helpers/form-actions';
// Helpers END

// Config (Dynamic Sections)
import { BID_HEADER_FORM_SECTIONS } from './config/bid-header-form.config';

import { CommonModule } from '@angular/common';
import { BidHeaderService } from '../../services/bid-header.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bid-header',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL
  ],
  templateUrl: './bid-header-form.component.html',
  styleUrls: ['./bid-header-form.component.scss']
})
export class BidHeaderFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;

  // Dynamic Form Sections for HTML loop
  formSections = BID_HEADER_FORM_SECTIONS;

  constructor(
    private fb: FormBuilder,
    private service: BidHeaderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Create Dynamic Form
    this.form = createBidHeaderForm(this.fb);

    // If editing → load record
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadRecord(id);
    }
  }

  goToList() {
    this.router.navigate(['/bid-header']);
  }

  loadRecord(id: string) {
    this.service.getById(id).subscribe({
      next: data => {
        patchBidRecord(this.form, data, splitDate);
        this.isEdit = true;
      },
      error: err => handleError(err, "Failed to load record")
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = normalizePayload(this.form.value);

    if (this.isEdit) {
      if (!payload.id) return alert("ID missing for update");

      this.service.update(payload).subscribe({
        next: () =>
          handleSuccess("Updated Successfully", this.router, () => {}, this.form),
        error: err => handleError(err, "Update Error")
      });

    } else {
      delete payload.id;

      this.service.save(payload).subscribe({
        next: () =>
          handleSuccess("Saved Successfully", this.router, () => {}, this.form),
        error: err => handleError(err, "Save Error")
      });
    }
  }

  edit(row: any) {
    this.isEdit = true;
    patchBidRecord(this.form, row, splitDate);
  }

  delete(id: string) {
    if (!confirm("Are you sure?")) return;

    this.service.delete(id).subscribe({
      next: () => handleDeleteSuccess(() => {}),
      error: err => handleError(err, "Delete Error")
    });
  }
}



// ❤️ Kya remove kiya & kyu?
// ❌ list1 → Form component me nahi chahiye
// ❌ displayedColumns → Yeh list component ke liye hota hai
// ❌ loadData() → Yeh bhi list page ka kaam
