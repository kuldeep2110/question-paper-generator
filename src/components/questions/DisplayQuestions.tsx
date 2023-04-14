import { FC, useState } from "react";
import QuestionCard from "./QuestionCard";
import QuestionDetails from "./QuestionDetails";
import { Question } from "../../utils/types";

type DisplayQuestionsProps = {
  questions: Question[];
};

enum LayoutType {
  Grid,
  List,
}

const DisplayQuestions: FC<DisplayQuestionsProps> = ({ questions }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [layoutType, setLayoutType] = useState<LayoutType>(LayoutType.Grid);

  const handleBack = () => {
    setSelectedQuestion(null);
  };

  const toggleLayout = () => {
    setLayoutType(
      layoutType === LayoutType.Grid ? LayoutType.List : LayoutType.Grid
    );
  };

  const renderQuestion = (question: Question) => {
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
        <div
          key={question.id}
          className="border-b border-gray-300 p-4 cursor-pointer"
          onClick={() => setSelectedQuestion(question)}
        >
          <h3 className="text-lg font-medium">{question.title}</h3>
          <p className="text-gray-600 mt-2 line-clamp-3">{question.question}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <p className="text-gray-600 mr-2">Module: {question.module}</p>
              <p className="text-gray-600">Marks: {question.marks}</p>
            </div>
            {question.img_url && (
              <img
                src={question.img_url}
                alt="Question"
                className="w-8 h-8 object-cover rounded-full"
              />
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-end mb-4">
        <button
          className="bg-gray-300 py-2 px-4 rounded-lg text-white mr-2"
          onClick={toggleLayout}
        >
          {layoutType === LayoutType.Grid ? "List View" : "Grid View"}
        </button>
      </div>
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
    </div>
  );
};

export default DisplayQuestions;
