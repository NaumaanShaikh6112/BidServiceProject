import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportCSV(rows: any[]) {
  const header = ['ID', 'Indent No', 'Vendor', 'Bid No', 'Bid Date', 'Status', 'Version'];
  const csvRows = [header.join(',')];

  rows.forEach(r => {
    csvRows.push([
      `"${r.id}"`,
      `"${r.indentNo || ''}"`,
      `"${r.vendorName || ''}"`,
      `"${r.bidNo || ''}"`,
      `"${r.bidDate ? new Date(r.bidDate).toLocaleDateString() : ''}"`,
      `"${r.status || ''}"`,
      `"${r.version ?? ''}"`
    ].join(','));
  });

  const blob = new Blob([csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, 'vendor-bid-list.csv');
}

export function exportExcel(rows: any[]) {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'BidHeaders');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  downloadBlob(blob, 'vendor-bid-list.xlsx');
}

export function exportPDF(rows: any[]) {
  const doc = new jsPDF('l', 'pt', 'a4');
  doc.text('Vendor Bid List', 40, 40);

  const body = rows.map(r => [
    r.id, r.indentNo, r.vendorName, r.bidNo,
    r.bidDate ? new Date(r.bidDate).toLocaleDateString() : '',
    r.status, r.version
  ]);

  autoTable(doc, {
    startY: 60,
    head: [['ID', 'Indent No', 'Vendor', 'Bid No', 'Bid Date', 'Status', 'Version']],
    body
  });

  doc.save('vendor-bid-list.pdf');
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}



