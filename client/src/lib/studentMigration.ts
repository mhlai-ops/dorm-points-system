export type StoredStudent = {
  id: string;
  qrCode?: string;
  name: string;
  points: number;
  nfcCode?: string;
};

export type StoredLog = {
  id: string;
  studentId: string;
  at: string;
  item: string;
  delta: number;
  balance: number;
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}

export function migrateStudentStorage<TStudent extends StoredStudent, TLog extends StoredLog>(
  students: TStudent[],
  logs: TLog[],
  createUuid: () => string,
): { students: Array<TStudent & { qrCode: string }>; logs: TLog[] } {
  const ids = new Map<string, string>();
  const migratedStudents = students.map(student => {
    const id = isUuid(student.id) ? student.id : createUuid();
    ids.set(student.id, id);
    return { ...student, id, qrCode: student.qrCode?.trim() || student.id };
  });

  return {
    students: migratedStudents,
    logs: logs.map(log => ({ ...log, studentId: ids.get(log.studentId) || log.studentId })),
  };
}

export function shouldSeedRemoteSnapshot(remoteStudentCount: number, localStudentCount: number): boolean {
  return remoteStudentCount === 0 && localStudentCount > 0;
}
