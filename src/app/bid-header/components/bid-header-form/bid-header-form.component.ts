import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BidHeaderService } from '../../services/bid-header.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


// Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
// ⚠️ NEW IMPORTS FOR DASHBOARD LAYOUT
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';


@Component({
  selector: 'app-bid-header',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    // ⚠️ NEW IMPORTS FOR DASHBOARD LAYOUT
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatBadgeModule
  ],
  templateUrl: './bid-header-form.component.html',
  styleUrls: ['./bid-header-form.component.scss'],
})

export class BidHeaderFormComponent  implements OnInit {

  form!: FormGroup;
  list1: any[] = [];
  isEdit = false;

  displayedColumns = [
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
    private fb: FormBuilder,
    private service: BidHeaderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

ngOnInit() {
  this.createForm();

  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.isEdit = true;
    this.loadRecord(id);
  }
}


goToList() {
  this.router.navigate(['/bid-header']);
}


  createForm() {
   const today = new Date().toISOString().substring(0, 10);

    // 🚩 CUSTOM VALIDATOR 1: Date cannot be in the future (For BidDate)
    const dateNotInFutureValidator = (control: AbstractControl): { [key: string]: any } | null => {
        const date = new Date(control.value);
        const todayDate = new Date();

        // Time components ko 0 set karna zaruri hai taaki sirf date comparison ho
        date.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        if (control.value && date > todayDate) {
          return { 'futureDate': true };
        }
        return null;
    };

    // 🚩 CUSTOM VALIDATOR 2: Date must be in the future (For ExpiryDate)
    const dateMustBeFutureValidator = (control: AbstractControl): { [key: string]: any } | null => {
        const date = new Date(control.value);
        const todayDate = new Date();

        // Time components ko 0 set karna zaruri hai
        date.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        // >= instead of > to allow today's date also as an expiry date start,
        // but FluentValidation demanded strictly future date, so using >
        if (control.value && date <= todayDate) {
          return { 'pastDate': true }; // Use 'pastDate' key for error
        }
        return null;
    };

    this.form = this.fb.group({
      id: [null],
    // REQUIRED FIELDS (Based on FluentValidation/Backend requirements)
    // 1. IndentNo (FluentValidation mein required hai)
      indentNo: ['',Validators.required],

    // 2. RfqId & VendorId (Jinke liye server ne "null conversion error" diya tha)
      rfqId: [null, Validators.required],
      vendorId: [null, Validators.required],

    // 3. VendorName (FluentValidation mein required hai)
      vendorName: ['', Validators.required],

    // 4. BidNo (Aapne pehle hi add kiya tha)
      bidNo: ['', Validators.required],

    // 5. BidDate (Required aur Future Date Validator)
      bidDate: [today, [Validators.required, dateNotInFutureValidator]],

    // 6. ExpiryDate (FluentValidation mein required hai. Iske liye ek aur validator chahiye hoga)
     expiryDate: [today, [Validators.required, dateMustBeFutureValidator]],

      factoryCode: [''],

     // 7. Status (Aapne pehle hi add kiya tha)
      status: ['', Validators.required],

      comparisonStatus: [''],
      assignedUserId: [null],
      priceBasisJson: [''],
      paymentTermsJson: [''],
      deliveryPeriodJson: [''],
      packingChargesType: [''],
      packingChargesPercentage: [0],
      packingChargesAmount: [0],
      localFreightType: [''],
      localFreightCharges: [0],
      freightAmount: [0],
      developmentCharges: [0],
      gstPercentage: [0],
      deliveryPeriod: [''],
      warranty: [''],
      ldClause: [''],
      // MobileNo: Required + 10 Digits Pattern (Based on FluentValidation)
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contactPerson: [''],
      makeCertificateMoc: [''],
      technicalSuitability: [''],
      isNegotiationAllowed: [false],
      version: [0, Validators.required],
      isLatestVersion: [true],
    });
  }

  // LOAD LIST (GET)
  loadData() {
    this.service.getAll().subscribe({
      next: (res: any) => {
        //Response wrapper: API hamesha ek wrapper object bhejta hai → { statusCode, message, data: [...] }
        this.list1 = res.data ? res.data : res;
      },
      error: (err) => {
        console.error("API Error:", err);
        if (typeof window !== 'undefined') alert("API NOT WORKING");
      }
    });
  }

  loadRecord(id: string) {
  this.service.getById(id).subscribe({
    next: (data: any) => {
      this.form.patchValue({
        ...data,
        bidDate: data.bidDate ? data.bidDate.split('T')[0] : '',
        expiryDate: data.expiryDate ? data.expiryDate.split('T')[0] : '',
        version: data.version ?? 0
      });

      this.isEdit = true;
    },
    error: (err: any) => {
      console.error("Load Edit Error:", err);
      alert("Failed to load record.");
    }
  });
}


  save() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const payload = {
    ...this.form.value,
    bidDate: this.form.value.bidDate ? new Date(this.form.value.bidDate).toISOString() : null,
    expiryDate: this.form.value.expiryDate ? new Date(this.form.value.expiryDate).toISOString() : null
  };

  if (this.isEdit) {
    if (!payload.id) {
      alert("ID missing for update");
      return;
    }
    this.service.update(payload).subscribe({
      next: () => {
        console.log("Updated Successfully");
        if (typeof window !== 'undefined') alert("Updated Successfully");
        this.router.navigate(['/bid-header']);
        setTimeout(() => { this.loadData(); }, 0);
        this.form.reset();
        this.isEdit = false;
      },
      error: (err) => console.error("Update Error:", err)
    });
    } else {
      // --- CREATE (POST) ---
      delete payload.id; // <--- CRITICAL: Remove ID so backend generates it

      this.service.save(payload).subscribe({
        next: () => {
          console.log("Saved Successfully");
          if (typeof window !== 'undefined') alert("Saved Successfully");

          // FIX: Use setTimeout to avoid NG0100 error
          setTimeout(() => { this.loadData(); }, 0);

          this.form.reset();
        },
        error: (err) => console.error("Save Error:", err)
      });
    }
  }

  // EDIT (PATCH DATA)
 edit(row: any) {
  this.isEdit = true;
  this.form.patchValue({
    ...row,
    bidDate: row.bidDate ? row.bidDate.split('T')[0] : '',
    expiryDate: row.expiryDate ? row.expiryDate.split('T')[0] : '',
    version: row.version ?? 0   // handle null version
  });
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

  // DELETE
  delete(id: string) {
    if (typeof window !== 'undefined' && !confirm("Are you sure?")) return;

    this.service.delete(id).subscribe({
      next: () => {
        console.log("Deleted Successfully");
        if (typeof window !== 'undefined') alert("Deleted Successfully");

        // FIX: Use setTimeout to avoid NG0100 error
        setTimeout(() => { this.loadData(); }, 0);
      },
      error: (err) => console.error("Delete Error:", err)
    });
  }
}
