import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MATERIAL } from '../../../shared/material';
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

  private fb = inject(FormBuilder);
  private service = inject(BidVersionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      bidHeaderId: ['', Validators.required],
      version: [1, Validators.required],
      offeredPrice: [0],
      negotiatedPrice: [0],
      gstPercentage: [0],
      discountPercentage: [0]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.loadRecord(id);
    }
  }

  loadRecord(id: string) {
    this.service.getById(id).subscribe(res => {
      this.form.patchValue(res);
    });
  }

  save() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.isEdit) {
      this.service.update(data.id, data).subscribe(() => {
        alert("Updated!");
        this.router.navigate(['/bid-version']);
      });
    } else {
      this.service.create(data).subscribe(() => {
        alert("Saved!");
        this.router.navigate(['/bid-version']);
      });
    }
  }

  goBack() {
    this.router.navigate(['/bid-version']);
  }
}
