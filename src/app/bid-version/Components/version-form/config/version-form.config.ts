// src/app/bid-version/Components/version-form/config/version-form.config.ts

import { SectionConfig } from "../../../../bid-header/components/bid-header-form/config/bid-header-form.config";

export const BID_VERSION_FORM_SECTIONS: SectionConfig[] = [

  {
    id: 'basicInfo',
    title: 'Basic Information',
    icon: 'info',
    cols: 2,
    fields: [
      {
        key: 'bidHeaderId',
        label: 'Bid Header',
        type: 'select',        // 🔥 Now a dropdown
        validators: { required: true },
        placeholder: 'Select Bid Header',
        options: []            // 🔥 Fill dynamically in TS (service.getAll())
      },
      {
        key: 'version',
        label: 'Version No',
        type: 'number',
        validators: { required: true, min: 1 },
        placeholder: 'Version number'
      }
    ]
  },

  // ----------------- PRICING -----------------
  {
    id: 'pricing',
    title: 'Pricing & Amounts',
    icon: 'payments',
    cols: 3,
    fields: [
      {
        key: 'offeredPrice',
        label: 'Offered Price',
        type: 'number',
        validators: { min: 0 },
        placeholder: 'Enter offered price'
      },
      {
        key: 'negotiatedPrice',
        label: 'Negotiated Price',
        type: 'number',
        validators: { min: 0 },
        placeholder: 'Enter negotiated price'
      },
      {
        key: 'negotiatedGstPercentage',
        label: 'GST %',
        type: 'number',
        validators: { min: 0, max: 100 },
        placeholder: 'GST in %'
      },
      {
        key: 'negotiatedDiscountPercentage',
        label: 'Discount %',
        type: 'number',
        validators: { min: 0, max: 100 },
        placeholder: 'Discount in %'
      },
      {
        key: 'negotiatedPackingAmount',
        label: 'Packing Amount',
        type: 'number',
        validators: { min: 0 },
        placeholder: 'Packing cost'
      }
    ]
  },

  // ----------------- TERMS -----------------
  {
    id: 'terms',
    title: 'Negotiation Terms',
    icon: 'description',
    cols: 2,
    fields: [
      {
        key: 'negotiatedDeliveryTerms',
        label: 'Delivery Terms',
        type: 'textarea',
        placeholder: 'Enter negotiated delivery terms'
      },
      {
        key: 'negotiatedPaymentTerms',
        label: 'Payment Terms',
        type: 'textarea',
        placeholder: 'Enter negotiated payment terms'
      },
      {
        key: 'negotiatedDeliveryPeriod',
        label: 'Delivery Period',
        type: 'text',
        placeholder: 'e.g. 4–6 Weeks'
      }
    ]
  },

  // ----------------- ADDITIONAL CHARGES -----------------
  {
    id: 'additional',
    title: 'Additional Charges',
    icon: 'calculate',
    cols: 3,
    fields: [
      {
        key: 'negotiatedFreightCharges',
        label: 'Freight Charges',
        type: 'number',
        validators: { min: 0 },
        placeholder: 'Freight charges'
      },
      {
        key: 'negotiatedBasicAmount',
        label: 'Basic Amount',
        type: 'number',
        validators: { min: 0 },
        placeholder: 'Basic amount'
      },
      {
        key: 'negotiatedTotalAmount',
        label: 'Total Amount',
        type: 'number',
        validators: { min: 0 },
        placeholder: 'Total negotiated amount'
      },
      {
        key: 'negotiatedLandedPrice',
        label: 'Landed Price',
        type: 'number',
        validators: { min: 0 },
        placeholder: 'Final landed price'
      },
      {
        key: 'negotiatedNetLandedCost',
        label: 'Net Landed Cost',
        type: 'number',
        validators: { min: 0 },
        placeholder: 'Net landed cost'
      }
    ]
  }

];
