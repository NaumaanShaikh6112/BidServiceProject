import { AbstractControl } from '@angular/forms';

export function dateMustBeFuture(control: AbstractControl) {
const value = control.value;
if (!value) return null;

const date = new Date(value);
const today = new Date();

date.setHours(0, 0, 0, 0);
today.setHours(0, 0, 0, 0);

return date <= today ? { pastDate: true } : null;
}

// ✅ Add this new required validator
export function dateMustBePast(control: AbstractControl) {
const value = control.value;
if (!value) return null;

const date = new Date(value);
const today = new Date();

date.setHours(0, 0, 0, 0);
today.setHours(0, 0, 0, 0);

return date >= today ? { futureDate: true } : null;
}
