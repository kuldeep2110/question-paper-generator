import { FC } from "react";
import { QuestionAuthorJoin } from "../../utils/types";
import { format } from "date-fns";
import ArrowIcon from "../ui/ArrowIcon";

type QuestionCardProps = {
  question: QuestionAuthorJoin;
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
      className="border border-slate-600 tracking-wider p-4 rounded-lg shadow-lg cursor-pointer font-sans hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-100 mb-6 bg-gray-700 group"
      onClick={onClick}
    >
      <div className="p-2">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col justify-center flex-grow gap-2 ">
            <h2 className="text-2xl text-gray-300 group-hover:text-cyan-500 font-semibold md:mb-0">
              {title}
            </h2>
            <div className="flex text-lg gap-2 md:gap-4 text-gray-400 group-hover:text-cyan-500">
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

        <p className="text-white mt-4 line-clamp-3 leading-relaxed tracking-wider">{questionValue}</p>

        {/* subject name and created at (date) */}

        <div className="flex justify-between items-end">
          <div className="flex flex-col justify-center gap-2 pt-4">
            <p className="text-cyan-500 mr-2">Subject: {subject_name}</p>
            <p>{formattedDate}</p>
          </div>
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
