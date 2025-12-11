import { FormBuilder, Validators } from '@angular/forms';

export function createBidVersionForm(fb: FormBuilder) {
  return fb.group({
    id: [''],
    bidHeaderId: ['', Validators.required],
    version: [1, Validators.required],

    offeredPrice: [0],
    negotiatedPrice: [null],
    negotiatedGstPercentage: [null],
    negotiatedDiscountPercentage: [null],
    negotiatedPackingAmount: [null],

    negotiatedDeliveryTerms: [''],
    negotiatedPaymentTerms: [''],
    negotiatedDeliveryPeriod: [''],

    negotiatedFreightCharges: [null],
    negotiatedBasicAmount: [null],
    negotiatedTotalAmount: [null],
    negotiatedLandedPrice: [null],
    negotiatedNetLandedCost: [null]
  });
}
