import { Subject } from "../utils/types";

export function SelectSubject(subjects: Subject[], selectSubjectId: string) {
  return subjects.find((subject) => subject.id! === selectSubjectId);
}
