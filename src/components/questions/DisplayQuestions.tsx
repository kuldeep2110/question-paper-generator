import { FC, useState } from "react";
import { LayoutType, Question, Subject, User } from "../../utils/types";
import QuestionCard from "./QuestionCard";
import QuestionDetails from "./QuestionDetails";

type DisplayQuestionsProps = {
  questions: Question[];
  subjects: Subject[];
  user: User | null;
  layoutType: LayoutType;
};

const DisplayQuestions: FC<DisplayQuestionsProps> = ({
  questions,
  subjects,
  user,
  layoutType,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  const handleBack = () => {
    setSelectedQuestion(null);
  };

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
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onClick={() => setSelectedQuestion(question)}
                />
              ))}
            </div>
          ) : (
            /**
             * Render questions as list items
             */
            <div>
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onClick={() => setSelectedQuestion(question)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayQuestions;
