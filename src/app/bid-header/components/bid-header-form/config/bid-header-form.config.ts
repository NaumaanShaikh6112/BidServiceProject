export type FieldType =
  'text' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox';

export interface FieldOption {
  value: any;
  label: string;
}

export interface FieldValidators {
  required?: boolean;
  pattern?: string;
  min?: number;
  max?: number;
  future?: boolean;
  past?: boolean;
}

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  validators?: FieldValidators;
  icon?: string;
  placeholder?: string;
  options?: FieldOption[];
}

export interface SectionConfig {
  id: string;
  title: string;
  icon?: string;
  cols?: number;
  fields: FieldConfig[];
}

export const BID_HEADER_FORM_SECTIONS: SectionConfig[] = [
  {
    id: 'basicInfo',
    title: 'Basic Information',
    icon: 'info',
    cols: 3,
    fields: [
      { key: 'indentNo', label: 'Indent Number', type: 'text', validators: { required: true } },
      { key: 'rfqId', label: 'RFQ ID', type: 'text', validators: { required: true } },
      { key: 'bidNo', label: 'Bid Number', type: 'text', validators: { required: true } },

      {
        key: 'bidDate',
        label: 'Bid Date',
        type: 'date',
        validators: { required: true, past: true }
      },
      {
        key: 'expiryDate',
        label: 'Expiry Date',
        type: 'date',
        validators: { required: true, future: true }
      },

      {
        key: 'status',
        label: 'Status',
        type: 'select',
        validators: { required: true },
        options: [
          { value: 'draft', label: 'Draft' },
          { value: 'submitted', label: 'Submitted' },
          { value: 'under_review', label: 'Under Review' },
          { value: 'approved', label: 'Approved' },
          { value: 'rejected', label: 'Rejected' }
        ]
      }
    ]
  },

  {
    id: 'vendorInfo',
    title: 'Vendor Information',
    icon: 'business',
    cols: 3,
    fields: [
      { key: 'vendorId', label: 'Vendor ID', type: 'text', validators: { required: true } },
      { key: 'vendorName', label: 'Vendor Name', type: 'text', validators: { required: true } },
      { key: 'contactPerson', label: 'Contact Person', type: 'text' },

      {
        key: 'mobileNo',
        label: 'Mobile Number',
        type: 'text',
        validators: { pattern: '^\\d{10}$' }
      },

      { key: 'factoryCode', label: 'Factory Code', type: 'text' },
      { key: 'assignedUserId', label: 'Assigned User ID', type: 'text' }
    ]
  },

  {
    id: 'pricing',
    title: 'Pricing & Charges',
    icon: 'payments',
    cols: 4,
    fields: [
      {
        key: 'packingChargesType',
        label: 'Packing Charges Type',
        type: 'select',
        options: [
          { value: 'percentage', label: 'Percentage' },
          { value: 'fixed', label: 'Fixed Amount' },
          { value: 'none', label: 'None' }
        ]
      },
      {
        key: 'packingChargesPercentage',
        label: 'Packing %',
        type: 'number',
        validators: { min: 0 }
      },
      {
        key: 'packingChargesAmount',
        label: 'Packing Amount',
        type: 'number',
        validators: { min: 0 }
      },
      {
        key: 'gstPercentage',
        label: 'GST %',
        type: 'number',
        validators: { min: 0 }
      },
      {
        key: 'localFreightType',
        label: 'Local Freight Type',
        type: 'select',
        options: [
          { value: 'included', label: 'Included' },
          { value: 'extra', label: 'Extra' },
          { value: 'fob', label: 'FOB' }
        ]
      },
      {
        key: 'localFreightCharges',
        label: 'Local Freight Charges',
        type: 'number',
        validators: { min: 0 }
      },
      {
        key: 'freightAmount',
        label: 'Freight Amount',
        type: 'number',
        validators: { min: 0 }
      },
      {
        key: 'developmentCharges',
        label: 'Development Charges',
        type: 'number',
        validators: { min: 0 }
      }
    ]
  },

  {
    id: 'terms',
    title: 'Terms & Conditions',
    icon: 'article',
    cols: 2,
    fields: [
      { key: 'priceBasisJson', label: 'Price Basis', type: 'textarea' },
      { key: 'paymentTermsJson', label: 'Payment Terms', type: 'textarea' },
      { key: 'deliveryPeriod', label: 'Delivery Period (Days)', type: 'text' },
      { key: 'deliveryPeriodJson', label: 'Delivery Period Details', type: 'textarea' },
      { key: 'warranty', label: 'Warranty', type: 'text' },
      { key: 'ldClause', label: 'LD Clause', type: 'text' }
    ]
  },

  {
    id: 'technical',
    title: 'Technical & Compliance',
    icon: 'engineering',
    cols: 3,
    fields: [
      { key: 'makeCertificateMoc', label: 'Make Certificate (MOC)', type: 'text' },

      {
        key: 'technicalSuitability',
        label: 'Technical Suitability',
        type: 'select',
        options: [
          { value: 'suitable', label: 'Suitable' },
          { value: 'partially_suitable', label: 'Partially Suitable' },
          { value: 'not_suitable', label: 'Not Suitable' },
          { value: 'pending_review', label: 'Pending Review' }
        ]
      },

      {
        key: 'comparisonStatus',
        label: 'Comparison Status',
        type: 'select',
        options: [
          { value: 'not_compared', label: 'Not Compared' },
          { value: 'in_progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' }
        ]
      }
    ]
  },

  {
    id: 'versionSettings',
    title: 'Version & Settings',
    icon: 'settings',
    cols: 4,
    fields: [
      {
        key: 'version',
        label: 'Version',
        type: 'number',
        validators: { required: true, min: 1 }
      },

      { key: 'isLatestVersion', label: 'Latest Version', type: 'checkbox' },
      { key: 'isNegotiationAllowed', label: 'Negotiation Allowed', type: 'checkbox' }
    ]
  }
];
