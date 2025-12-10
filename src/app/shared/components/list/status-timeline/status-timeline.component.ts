import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MATERIAL } from '../../../material';

@Component({
  selector: 'app-status-timeline',
  standalone: true,
  imports: [CommonModule, ...MATERIAL],
  template: `
    <div class="status-dialog">
      <div class="status-dialog-header">
        <h2>Status Timeline</h2>
        <button mat-icon-button mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="status-dialog-body">
        <p class="bid-id">
          Reference No: <strong>{{ data?.refNo }}</strong>
        </p>

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
export class StatusTimelineComponent {
  data = inject(MAT_DIALOG_DATA) as any;
}
