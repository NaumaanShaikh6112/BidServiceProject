// src/app/bid-header/bid-header-form/date-helpers.ts

// Convert ISO → yyyy-MM-dd (for form fields)
export function splitDate(value: string | null | undefined): string {
  if (!value) return '';
  return value.split('T')[0];   // backend ISO string → form input format
}

// Convert yyyy-MM-dd → ISO string (for backend)
export function toISO(value: string | null): string | null {
  if (!value) return null;
  return new Date(value).toISOString();
}

// Normalize payload (so we don't repeat conversions in save)
export function normalizePayload(formValue: any) {
  return {
    ...formValue,
    bidDate: toISO(formValue.bidDate),
    expiryDate: toISO(formValue.expiryDate)
  };
}
