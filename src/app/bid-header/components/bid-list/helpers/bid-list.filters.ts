export interface BidFilters {
  search: string;
  status: string | null;
  vendor: string;
  dateFrom: string | null;
  dateTo: string | null;
}

export function createFilterPredicate() {
  return (data: any, filterJson: string) => {
    if (!filterJson) return true;

    const f: BidFilters = JSON.parse(filterJson);

    const combined = (
      (data.id || '') +
      (data.indentNo || '') +
      (data.vendorName || '') +
      (data.bidNo || '') +
      (data.status || '')
    ).toLowerCase();

    const matchesSearch = !f.search || combined.includes(f.search);
    const matchesVendor = !f.vendor || (data.vendorName || '').toLowerCase().includes(f.vendor);
    const matchesStatus = !f.status || (data.status || '').toLowerCase() === f.status;

    let matchesDate = true;
    if (f.dateFrom || f.dateTo) {
      const bidDate = data.bidDate ? new Date(data.bidDate) : null;
      const from = f.dateFrom ? new Date(f.dateFrom) : null;
      const to = f.dateTo ? new Date(f.dateTo) : null;

      if (bidDate) {
        if (from && bidDate < from) matchesDate = false;
        if (to) {
          to.setHours(23, 59, 59, 999);
          if (bidDate > to) matchesDate = false;
        }
      }
    }

    return matchesSearch && matchesVendor && matchesStatus && matchesDate;
  };
}
