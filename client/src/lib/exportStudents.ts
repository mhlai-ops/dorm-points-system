import * as XLSX from "xlsx";

export type ExportStudent = {
  name: string;
  room?: string;
  className?: string;
  staffInCharge?: string;
  points: number;
  qrCode?: string;
  nfcCode?: string;
};

export const exportStudentsToExcel = (students: ExportStudent[], date = new Date()) => {
  const rows = students.map(student => ({
    "姓名": student.name,
    "房號": student.room || "",
    "班別": student.className || "",
    "個案職員": student.staffInCharge || "",
    "最新分數": student.points,
    "QR Code": student.qrCode || "",
    "NFC Code": student.nfcCode || "",
  }));
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(rows);
  sheet["!cols"] = [
    { wch: 16 }, { wch: 12 }, { wch: 12 }, { wch: 18 },
    { wch: 12 }, { wch: 14 }, { wch: 16 },
  ];
  XLSX.utils.book_append_sheet(workbook, sheet, "宿生分數");
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const filename = `宿生分數紀錄_${yyyy}${mm}${dd}.xlsx`;
  XLSX.writeFile(workbook, filename);
  return filename;
};
