import { FC, useState } from "react";
import {
  LayoutType,
  SubjectQuestionJoin,
  QuestionAuthorJoin,
} from "../../utils/types";
import QuestionCard from "./QuestionCard";
import QuestionDetails from "./QuestionDetails";
import { useSearchParams } from "react-router-dom";

type DisplayQuestionsProps = {
  subjectsWithQuestions: SubjectQuestionJoin[];
  layoutType: LayoutType;
  selectQuestion: SelectQuestion;
};

interface SelectQuestion {
  selectedQuestion: QuestionAuthorJoin | null;
  setSelectedQuestion: (question: QuestionAuthorJoin | null) => void;
  handleBack: () => void;
}

const DisplayQuestions: FC<DisplayQuestionsProps> = ({
  subjectsWithQuestions,
  layoutType,
  selectQuestion,
}) => {
  const { selectedQuestion, setSelectedQuestion, handleBack } = selectQuestion;

  return (
    <>
      {selectedQuestion ? (
        <QuestionDetails question={selectedQuestion} onBack={handleBack} />
      ) : (
        <div className="pt-2">
          {subjectsWithQuestions.flatMap((subject) => subject.questions)
            .length === 0 ? (
            <div className="flex flex-col p-10 md:p-32 items-center justify-center h-full">
              <div className="text-2xl font-semibold text-gray-500">
                No questions found
              </div>
              <div className="text-gray-500">
                <p>
                  You can add questions by clicking the{" "}
                  <span className="underline text-cyan-500">Add Question</span>{" "}
                  button above
                </p>
              </div>
            </div>
          ) : layoutType === LayoutType.Grid ? (
            /**
             * Render questions as grid items
             */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjectsWithQuestions.map((subject) =>
                subject.questions.map((question: QuestionAuthorJoin) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    subject_name={subject.subject_name}
                    onClick={() => setSelectedQuestion(question)}
                  />
                ))
              )}
            </div>
          ) : (
            /**
             * Render questions as list items
             */
            <div>
              {subjectsWithQuestions.map((subject) =>
                subject.questions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    subject_name={subject.subject_name}
                    onClick={() => setSelectedQuestion(question)}
                  />
                ))
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayQuestions;
