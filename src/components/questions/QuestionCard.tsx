import { FC, useState } from "react";
import { Question } from "../../utils/types";

type QuestionCardProps = {
  question: Question;
  onClick: (questionId: number | string) => void;
};

const QuestionCard: FC<QuestionCardProps> = ({ question, onClick }) => {
  const { title, question: questionValue, module, marks, img_url } = question;

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
      onClick={() => onClick(question.id!)}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium">{title}</h2>
        {img_url && (
          <img src={img_url} alt="Question" className="w-8 h-8 rounded-full" />
        )}
      </div>
      <p className="text-gray-600 text-sm mb-2">
        {questionValue.substring(0, 100)}...
      </p>
      <div className="flex items-center justify-between text-gray-600 text-xs">
        <p>Module {module}</p>
        <p>{marks} Marks</p>
      </div>
    </div>
  );
};

export default QuestionCard;
