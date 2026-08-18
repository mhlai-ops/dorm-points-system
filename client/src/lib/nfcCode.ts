export type NfcCodeStudent = {
  qrCode: string;
  name: string;
  nfcCode?: string;
};

export function normalizeNfcCode(value: string | null | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized || undefined;
}

export function normalizeQrCode(value: string | null | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized || undefined;
}

export function matchesStudentQuery(student: NfcCodeStudent, query: string): boolean {
  const normalized = query.trim();
  if (!normalized) return false;
  return student.name.includes(normalized)
    || student.qrCode.includes(normalized)
    || (normalizeNfcCode(student.nfcCode)?.includes(normalized) ?? false);
}

export function findStudentByQrCode<T extends NfcCodeStudent>(students: T[], scannedValue: string): T | undefined {
  const normalized = normalizeQrCode(scannedValue);
  return normalized ? students.find(student => student.qrCode === normalized) : undefined;
}

export function findStudentByNfcCode<T extends NfcCodeStudent>(students: T[], scannedValue: string): T | undefined {
  const normalized = scannedValue.trim();
  if (!normalized) return undefined;

  return students.find(student => normalizeNfcCode(student.nfcCode) === normalized)
    // 舊卡尚未設定 NFC Code 時，保留以 QR Code 作為讀取備援。
    || findStudentByQrCode(students, normalized);
}

export function isNfcCodeInUse<T extends NfcCodeStudent>(students: T[], nfcCode: string): boolean {
  const normalized = normalizeNfcCode(nfcCode);
  return Boolean(normalized && students.some(student => normalizeNfcCode(student.nfcCode) === normalized));
}

export function isQrCodeInUse<T extends NfcCodeStudent>(students: T[], qrCode: string): boolean {
  const normalized = normalizeQrCode(qrCode);
  return Boolean(normalized && students.some(student => student.qrCode === normalized));
}
