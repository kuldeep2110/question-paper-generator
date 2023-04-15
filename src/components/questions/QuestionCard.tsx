import { FC, useState } from "react";
import { Question } from "../../utils/types";

type QuestionCardProps = {
  question: Question;
  onClick: (questionId: number | string) => void;
};

const QuestionCard: FC<QuestionCardProps> = ({ question, onClick }) => {
  const { title, img_url, module, marks, question: questionValue } = question;

  return (
    <div
      className="border border-slate-600 tracking-wider bg-slate-800  p-4 rounded-lg shadow-lg cursor-pointer font-sans hover:bg-gray-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-100"
      onClick={() => onClick(question.id!)}
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex items-center justify-between">
          {img_url ? (
            <img
              src={img_url}
              alt="Question"
              className="w-14 h-14 object-cover rounded-full"
            />
          ) : (
            <div className="w-14 h-14 bg-gray-700 flex justify-center items-center rounded-full">
              {IMAGE_PLACEHOLDER}
            </div>
          )}
          <div className="flex flex-col text-gray-400 text-sm">
            <p className="mb-1">Module: {module}</p>
            <p>Marks: {marks}</p>
          </div>
        </div>
        <p className="text-white mt-4 line-clamp-5">{questionValue}</p>
      </div>
    </div>
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

export default QuestionCard;
