import { Subject } from "../utils/types";

export function SelectSubject(subjects: Subject[], selectSubjectId: string) {
  console.log("subjects in select subject", subjects);
  let ans = subjects.find((subject) => subject.id! === selectSubjectId);
  console.log("ans", ans);
  return ans;
}
