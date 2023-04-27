import { FC } from "react";
import { SubjectQuestionJoin, User } from "../../utils/types";
import CyanButton from "../ui/CyanButton";
import AddQuestion from "./AddQuestion";
import { IconFileSettings } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface QuestionHeaderProps {
  subjectsWithQuestions: SubjectQuestionJoin[];
  user: User | null;
  toggleLayout: () => void;
  fetchUser_Questions_Subjects: () => Promise<void>;
  selectedSubject?: string;
}

const QuestionHeader: FC<QuestionHeaderProps> = ({
  subjectsWithQuestions,
  user,
  toggleLayout,
  fetchUser_Questions_Subjects,
  selectedSubject,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row justify-between items-center pb-2 font-sans">
        <h1 className="text-4xl font-bold">Questions</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* LAYOUT */}
          <div className="hidden md:block">
            <CyanButton
              onClick={() => {
                toggleLayout();
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <i>{SWITCH_ICON}</i>
              </div>
            </CyanButton>
          </div>
          {/* GENERATE */}
          <div className="flex justify-between md:flex gap-3">
            {selectedSubject && (
              <div>
                <button
                  className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    navigate(`/generate/${selectedSubject}`);
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <IconFileSettings size={20}></IconFileSettings>
                    <span>Generate</span>
                  </div>
                </button>
              </div>
            )}
            {/* QUESTION */}
            <AddQuestion
              fetchUser_Questions_Subjects={fetchUser_Questions_Subjects}
              subjects={subjectsWithQuestions}
              user={user}
            />
          </div>
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
