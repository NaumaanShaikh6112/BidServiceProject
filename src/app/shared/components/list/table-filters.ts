// export interface BidFilters {
//   search: string;
//   status: string | null;
//   vendor: string;
//   dateFrom: string | null;
//   dateTo: string | null;
// }

// export function createFilterPredicate() {
//   return (data: any, filterJson: string) => {
//     if (!filterJson) return true;

//     const f: BidFilters = JSON.parse(filterJson);

//     const combined = (
//       (data.id || '') +
//       (data.indentNo || '') +
//       (data.vendorName || '') +
//       (data.bidNo || '') +
//       (data.status || '')
//     ).toLowerCase();

//     const matchesSearch = !f.search || combined.includes(f.search);
//     const matchesVendor = !f.vendor || (data.vendorName || '').toLowerCase().includes(f.vendor);
//     const matchesStatus = !f.status || (data.status || '').toLowerCase() === f.status;

//     let matchesDate = true;
//     if (f.dateFrom || f.dateTo) {
//       const bidDate = data.bidDate ? new Date(data.bidDate) : null;
//       const from = f.dateFrom ? new Date(f.dateFrom) : null;
//       const to = f.dateTo ? new Date(f.dateTo) : null;

//       if (bidDate) {
//         if (from && bidDate < from) matchesDate = false;
//         if (to) {
//           to.setHours(23, 59, 59, 999);
//           if (bidDate > to) matchesDate = false;
//         }
//       }
//     }

//     return matchesSearch && matchesVendor && matchesStatus && matchesDate;
//   };
// }


// src/app/shared/components/list/table-filters.ts
export interface ListFilters {
  search: string;
  dateFrom?: string | null;
  dateTo?: string | null;
  // optional custom filters can be added by consumers (status, vendor etc.)
  [key: string]: any;
}

/**
 * Generic filter predicate for MatTableDataSource.
 * Optional `searchFields` lets you restrict search to specific keys (['vendorName','bidNo']).
 */
export function createGlobalFilterPredicate<T = any>(searchFields?: string[]) {
  return (data: T, filterJson: string) => {
    if (!filterJson) return true;
    const f: ListFilters = JSON.parse(filterJson);

    // 1) TEXT SEARCH (over whole record or only searchFields)
    const textToSearch = (searchFields && searchFields.length)
      ? searchFields.map(k => ((data as any)[k] ?? '')).join(' ').toLowerCase()
      : JSON.stringify(data).toLowerCase();

    const matchesSearch = !f.search || textToSearch.includes((f.search ?? '').toLowerCase());

    // 2) DATE RANGE (expects item date fields to be ISO or parseable; consumer can normalize)
    let matchesDate = true;
    if (f.dateFrom || f.dateTo) {
      // auto-detect a date field (common names)
      const possibleDateKeys = ['date','bidDate','createdAt','updatedAt'];
      const dateKey = possibleDateKeys.find(k => !!(data as any)[k]);
      if (dateKey) {
        const itemDate = (data as any)[dateKey] ? new Date((data as any)[dateKey]) : null;
        const from = f.dateFrom ? new Date(f.dateFrom) : null;
        const to = f.dateTo ? new Date(f.dateTo) : null;
        if (itemDate) {
          if (from && itemDate < from) matchesDate = false;
          if (to) {
            to.setHours(23,59,59,999);
            if (itemDate > to) matchesDate = false;
          }
        }
      }
    }

    // 3) CUSTOM EXACT MATCH filters (like status, vendor etc.)
    let matchesCustom = true;
    Object.keys(f).forEach(k => {
      if (k === 'search' || k === 'dateFrom' || k === 'dateTo') return;
      const filterVal = f[k];
      if (filterVal == null || filterVal === '') return;
      const itemVal = ((data as any)[k] ?? '').toString().toLowerCase();
      if (itemVal !== filterVal.toString().toLowerCase()) matchesCustom = false;
    });

    return matchesSearch && matchesDate && matchesCustom;
  };
}
