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

  const renderQuestion = (question: Question) => {
    const {
      id,
      title,
      img_url,
      module,
      marks,
      question: questionValue,
    } = question;

    if (layoutType === LayoutType.Grid) {
      return (
        <QuestionCard
          key={question.id}
          question={question}
          onClick={() => setSelectedQuestion(question)}
        />
      );
    } else {
      return (
        <>
          <div
            key={question.id}
            className="flex items-center border-b border-white py-6 mb-4 px-10"
          >
            {question.img_url ? (
              <img
                src={question.img_url}
                alt="Question"
                className="w-24 h-24 object-cover rounded-full"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-700 flex justify-center items-center rounded-full">
                {IMAGE_PLACEHOLDER}
              </div>
            )}
            <div className="ml-4 flex-grow">
              <h2 className="text-lg font-semibold">{question.title}</h2>
              <div className="flex items-center justify-between">
                <div className="flex flex-col text-gray-400 text-sm">
                  <p className="mb-1">Module: {question.module}</p>
                  <p>Marks: {question.marks}</p>
                </div>
                <button
                  className="px-4 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out"
                  // onClick={() => onClick(question.id!)}
                >
                  View Question
                </button>
              </div>
              <p className="text-gray-500 mt-4 line-clamp-5">
                {question.question}
              </p>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      {selectedQuestion ? (
        <QuestionDetails question={selectedQuestion} onBack={handleBack} />
      ) : (
        <div>
          {layoutType === LayoutType.Grid ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {questions.map(renderQuestion)}
            </div>
          ) : (
            <div>{questions.map(renderQuestion)}</div>
          )}
        </div>
      )}
    </>
  );
};

const IMAGE_PLACEHOLDER = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
    />
  </svg>
);

export default DisplayQuestions;
