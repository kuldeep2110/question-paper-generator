import { FC, useState } from "react";
import {
  LayoutType,
  SubjectQuestionJoin,
  QuestionAuthorJoin,
} from "../../utils/types";
import QuestionCard from "./QuestionCard";
import QuestionDetails from "./QuestionDetails";

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
        <div className="pt-6">
          {layoutType === LayoutType.Grid ? (
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
