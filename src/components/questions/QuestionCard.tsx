import { FC } from "react";
import { Question } from "../../utils/types";
import { format } from "date-fns";

type QuestionCardProps = {
  question: Question;
  subject_name: string;
  onClick: () => void;
};

const QuestionCard: FC<QuestionCardProps> = ({
  question,
  onClick,
  subject_name,
}) => {
  const {
    title,
    img_url,
    module,
    marks,
    question: questionValue,
    created_at,
  } = question;

  const formattedDate = format(new Date(created_at!), "MMMM d, yyyy");

  return (
    <div
      className="border border-slate-600 tracking-wider   p-4 rounded-lg shadow-lg cursor-pointer font-sans hover:bg-gray-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-100 mb-6"
      onClick={onClick}
    >
      <div className="p-2">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col justify-center flex-grow gap-2 hover:underline">
            <h2 className="text-2xl font-semibold md:mb-0">{title}</h2>
            <div className="flex gap-2 md:gap-4 text-gray-400 text-sm">
              <p className="mb-1">Module: {module}</p>
              <p>Marks: {marks}</p>
            </div>
          </div>
          {img_url && (
            <div className="flex-shrink-0 w-14 h-14">
              <img
                src={img_url}
                alt="Question"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}
        </div>

        <p className="text-white mt-4 line-clamp-5">{questionValue}</p>

        {/* subject name and created at (date) */}

        <div className="flex flex-col justify-center gap-2 pt-4">
          <p className="text-cyan-600 mr-2">Subject: {subject_name}</p>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
