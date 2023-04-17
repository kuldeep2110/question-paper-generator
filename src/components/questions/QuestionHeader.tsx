import { FC, useState } from "react";
import { LayoutType, SubjectQuestionJoin, User } from "../../utils/types";
import CyanButton from "../ui/CyanButton";
import AddQuestion from "./AddQuestion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface QuestionHeaderProps {
  subjects: SubjectQuestionJoin[];
  user: User | null;
  layoutType: LayoutType;
  toggleLayout: () => void;
  fetchUser_Questions_Subjects: () => Promise<void>;
  filterSubject: (subjectId: string) => void;
}

const QuestionHeader: FC<QuestionHeaderProps> = ({
  subjects,
  user,
  toggleLayout,
  layoutType,
  filterSubject,
  fetchUser_Questions_Subjects,
}) => {
  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row justify-between items-center pb-2 font-sans">
        <h1 className="text-4xl font-bold">Questions</h1>
        <div className="flex items-center gap-4">
          <div>
            <Select
              onValueChange={(e) => {
                filterSubject(e);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subjects</SelectLabel>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id!}>
                      {subject.subject_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="hidden md:block">
            <CyanButton
              onClick={() => {
                toggleLayout();
              }}
            >
              <div className="flex items-center justify-center gap-2">
                {layoutType === LayoutType.Grid ? "List View" : "Grid View"}
                <i>{SWITCH_ICON}</i>
              </div>
            </CyanButton>
          </div>
          <AddQuestion
            fetchUser_Questions_Subjects={fetchUser_Questions_Subjects}
            subjects={subjects}
            user={user}
          />
        </div>
      </div>
    </>
  );
};

const SWITCH_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
    />
  </svg>
);

export default QuestionHeader;
