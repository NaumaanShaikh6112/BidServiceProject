import { FormBuilder, Validators } from '@angular/forms';
import { BID_HEADER_FORM_SECTIONS } from '../config/bid-header-form.config';
import { dateMustBeFuture, dateMustBePast } from './validators';

export function createBidHeaderForm(fb: FormBuilder) {

  const group: any = {
    id: [null],
    lastSyncAt: [null],
    isSyncedToExternalApi: [null],
    lastModifiedDateTime: [null],
    createdAt: [null],
    updatedAt: [null],
    rfqTitle: [null],
    assignedUserName: [null]
  };

  // LOOP THROUGH CONFIG
  for (const section of BID_HEADER_FORM_SECTIONS) {
    for (const field of section.fields) {

      const validators: any[] = [];

      // REQUIRED
      if (field.validators?.required) {
        validators.push(Validators.required);
      }

      // PATTERN
      if (field.validators?.pattern) {
        validators.push(Validators.pattern(new RegExp(field.validators.pattern)));
      }

      // MIN / MAX
      if (field.validators?.min !== undefined) {
        validators.push(Validators.min(field.validators.min));
      }

      if (field.validators?.max !== undefined) {
        validators.push(Validators.max(field.validators.max));
      }

      // DATE VALIDATORS
      if (field.validators?.future) {
        validators.push(dateMustBeFuture);
      }

      if (field.validators?.past) {
        validators.push(dateMustBePast);
      }

      // DEFAULT VALUE
      let initial: any = '';

      if (field.type === 'number') initial = 0;
      if (field.type === 'checkbox') initial = false;
      if (field.type === 'date') initial = new Date().toISOString().substring(0, 10);

      group[field.key] = [initial, validators];
    }
  }

  return fb.group(group);
}
