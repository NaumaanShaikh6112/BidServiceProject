// src/app/bid-version/Components/version-form/version-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MATERIAL } from '../../../shared/material';

// Helpers
import { createBidVersionForm } from './helpers/form-factory';
import { splitDate, normalizePayload } from '../../../shared/components/list/date-helpers';
import {
  patchBidRecord,
  handleSuccess,
  handleDeleteSuccess,
  handleError
} from '../../../shared/components/list/form-actions';

// Config
import { BID_VERSION_FORM_SECTIONS } from './config/version-form.config';
import { BidHeaderService } from '../../../bid-header/services/bid-header.service';
import { BidVersionService } from '../../services/bid-version.service';

@Component({
  selector: 'app-version-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ...MATERIAL],
  templateUrl: './version-form.component.html',
  styleUrls: ['./version-form.component.scss']
})
export class VersionFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;

  // Dynamic sections → loop use in HTML
  formSections = BID_VERSION_FORM_SECTIONS;

  constructor(
    private fb: FormBuilder,
    private service: BidVersionService,
    private headerService: BidHeaderService,   // 🔥 ADD THIS LINE
    private route: ActivatedRoute,
    private router: Router
  ) {}

ngOnInit() {
  this.form = createBidVersionForm(this.fb);

  this.loadBidHeaderOptions();  // 🔥 load dropdown

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.isEdit = true;
    this.loadRecord(id);
  }

  // Autofill for create mode
  this.form.get("bidHeaderId")?.valueChanges.subscribe(id => {
    if (!id) return;
    this.autofillFromHeader(id);
  });
}

// Load dropdown options
loadBidHeaderOptions() {
  this.headerService.getAll().subscribe((res: any) => {

    const headers = Array.isArray(res) ? res : res.data ?? [];

    const section = this.formSections[0];
    const field = section.fields.find(f => f.key === "bidHeaderId");

    if (field) {
      field.options = headers.map((h: any) => ({
        value: h.id,
        label: `${h.bidNo} - ${h.vendorName}`
      }));
    }
  });
}


// Autofill
autofillFromHeader(id: string) {
  this.headerService.getById(id).subscribe(header => {
    this.form.patchValue({
      offeredPrice: header?.offeredPrice ?? 0,
      negotiatedPrice: header?.negotiatedPrice ?? 0,
      negotiatedGstPercentage: header?.gstPercentage ?? null,
    });
  });
}


  goToList() {
    this.router.navigate(['/bid-version']);
  }

  loadRecord(id: string) {
    this.service.getById(id).subscribe({
      next: (data) => {
        patchBidRecord(this.form, data, splitDate);
      },
      error: err => handleError(err, "Failed to load version")
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = normalizePayload(this.form.value);

    if (this.isEdit) {
      this.service.update(payload).subscribe({
        next: () =>
          handleSuccess("Version Updated", this.router, () => {}, this.form),
        error: err => handleError(err, "Update Failed")
      });
    } else {
      delete payload.id;

      this.service.create(payload).subscribe({
        next: () =>
          handleSuccess("Version Created", this.router, () => {}, this.form),
        error: err => handleError(err, "Create Failed")
      });
    }
  }
}
