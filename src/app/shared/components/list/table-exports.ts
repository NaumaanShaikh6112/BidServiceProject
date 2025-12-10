// src/app/shared/components/list/table-exports.ts
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type ColumnDef = { key: string; label?: string };

/**
 * Export CSV (rows: array of objects).
 * optional `columns` to control header order and labels.
 */
export function exportCSV(rows: any[], columns?: ColumnDef[], filename = 'export.csv') {
  if (!rows || rows.length === 0) return;
  const cols = columns && columns.length ? columns : Object.keys(rows[0]).map(k => ({ key: k, label: k }));
  const header = cols.map(c => `"${c.label ?? c.key}"`).join(',');
  const csvRows = [header];

  rows.forEach(r => {
    const line = cols.map(c => {
      const v = r[c.key];
      // basic escaping for quotes and commas
      const text = v == null ? '' : v.toString().replace(/"/g, '""');
      return `"${text}"`;
    }).join(',');
    csvRows.push(line);
  });

  const blob = new Blob([csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, filename);
}

export function exportExcel(rows: any[], columns?: ColumnDef[], filename = 'export.xlsx') {
  if (!rows || rows.length === 0) return;
  const cols = columns && columns.length ? columns : Object.keys(rows[0]).map(k => ({ key: k, label: k }));
  const sheetData = rows.map(r => {
    const obj: any = {};
    cols.forEach(c => obj[c.label ?? c.key] = r[c.key]);
    return obj;
  });

  const ws = XLSX.utils.json_to_sheet(sheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  downloadBlob(blob, filename);
}

export function exportPDF(rows: any[], columns?: ColumnDef[], filename = 'export.pdf', title = 'Report') {
  if (!rows || rows.length === 0) return;
  const cols = columns && columns.length ? columns : Object.keys(rows[0]).map(k => ({ key: k, label: k }));
  const head = [cols.map(c => c.label ?? c.key)];
  const body = rows.map(r => cols.map(c => r[c.key] ?? ''));

  const doc = new jsPDF('l', 'pt', 'a4');
  doc.text(title, 40, 40);
  autoTable(doc, {
    startY: 60,
    head,
    body
  });
  doc.save(filename);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}



// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// export function exportCSV(rows: any[]) {
//   const header = ['ID', 'Indent No', 'Vendor', 'Bid No', 'Bid Date', 'Status', 'Version'];
//   const csvRows = [header.join(',')];

//   rows.forEach(r => {
//     csvRows.push([
//       `"${r.id}"`,
//       `"${r.indentNo || ''}"`,
//       `"${r.vendorName || ''}"`,
//       `"${r.bidNo || ''}"`,
//       `"${r.bidDate ? new Date(r.bidDate).toLocaleDateString() : ''}"`,
//       `"${r.status || ''}"`,
//       `"${r.version ?? ''}"`
//     ].join(','));
//   });

//   const blob = new Blob([csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
//   downloadBlob(blob, 'vendor-bid-list.csv');
// }

// export function exportExcel(rows: any[]) {
//   const ws = XLSX.utils.json_to_sheet(rows);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, 'BidHeaders');
//   const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

//   const blob = new Blob([wbout], { type: 'application/octet-stream' });
//   downloadBlob(blob, 'vendor-bid-list.xlsx');
// }

// export function exportPDF(rows: any[]) {
//   const doc = new jsPDF('l', 'pt', 'a4');
//   doc.text('Vendor Bid List', 40, 40);

//   const body = rows.map(r => [
//     r.id, r.indentNo, r.vendorName, r.bidNo,
//     r.bidDate ? new Date(r.bidDate).toLocaleDateString() : '',
//     r.status, r.version
//   ]);

//   autoTable(doc, {
//     startY: 60,
//     head: [['ID', 'Indent No', 'Vendor', 'Bid No', 'Bid Date', 'Status', 'Version']],
//     body
//   });

//   doc.save('vendor-bid-list.pdf');
// }

// function downloadBlob(blob: Blob, filename: string) {
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename;
//   a.click();
//   URL.revokeObjectURL(url);
// }
