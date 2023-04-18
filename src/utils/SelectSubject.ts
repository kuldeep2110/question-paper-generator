import { Subject } from "../utils/types";

export function SelectSubject(subjects: Subject[], selectSubjectId: string) {
  console.log("subjects", subjects);
  return subjects.find((subject) => subject.id! === selectSubjectId);
}
