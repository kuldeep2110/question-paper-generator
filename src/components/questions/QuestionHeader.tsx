import { FC } from "react";
import { LayoutType, Subject, User } from "../../utils/types";
import CyanButton from "../ui/CyanButton";
import AddQuestion from "./AddQuestion";

interface QuestionHeaderProps {
  subjects: Subject[];
  user: User | null;
  layoutType: LayoutType;
  toggleLayout: () => void;
  fetchUser_Questions_Subjects: () => Promise<void>;
}

const QuestionHeader: FC<QuestionHeaderProps> = ({
  subjects,
  user,
  toggleLayout,
  layoutType,
  fetchUser_Questions_Subjects,
}) => {
  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row justify-between items-center mb-4 font-sans">
        <h1 className="text-4xl font-bold">Questions</h1>
        <div className="flex items-center gap-4">
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
