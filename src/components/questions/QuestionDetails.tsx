import { FC } from "react";
import { Question } from "../../utils/types";

type QuestionDetailsProps = {
  question: Question;
  onBack: () => void;
};

const QuestionDetails: FC<QuestionDetailsProps> = ({ question, onBack }) => {
  return (
    <div>
      <button
        className="bg-gray-300 py-2 px-4 rounded-lg text-white"
        onClick={onBack}
      >
        Back
      </button>
      <h1 className="text-3xl font-bold my-4">{question.title}</h1>
      {question.img_url && (
        <img
          src={question.img_url}
          alt="Question"
          className="w-full h-64 object-cover rounded-lg my-4"
        />
      )}
      <p className="text-gray-600 my-4">{question.question}</p>
      <div className="flex justify-between items-center">
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
};

export default QuestionDetails;
