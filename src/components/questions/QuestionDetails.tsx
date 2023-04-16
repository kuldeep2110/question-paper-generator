import { FC } from "react";
import { QuestionAuthorJoin } from "../../utils/types";
import { format } from "date-fns";

type QuestionDetailsProps = {
  question: QuestionAuthorJoin;
  onBack: () => void;
};

const QuestionDetails: FC<QuestionDetailsProps> = ({ question, onBack }) => {
  const {
    title,
    created_at,
    img_url,
    question: questionValue,
    module,
    marks,
    author_id: author,
  } = question;

  const formattedDate = format(new Date(created_at!), "MMMM d, yyyy");

  console.log("AUTHOR: ===", author);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-300">
      <div className="p-4 shadow-lg flex justify-between items-center border-b">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <button
          className="text-cyan-200 hover:text-cyan-400 focus:outline-none hover:bg-gray-600 rounded-lg p-2"
          onClick={onBack}
        >
          {/* <ArrowIcon /> */}
          <div className="flex items-center gap-1">
            <i>
              <BACK_ICON />
            </i>
            <span>Go Back</span>
          </div>
        </button>
      </div>
      <div className="flex-grow p-4">
        <div className="flex items-center justify-center">
          {img_url ? (
            <img
              src={img_url}
              alt="Question"
              className="w-48 h-48 object-cover rounded-full shadow-xl"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-700 rounded-full flex items-center justify-center">
              <p className="text-3xl font-bold">?</p>
            </div>
          )}
        </div>
        <div className="mt-12 tracking-wider">
          <div className="text-lg font-medium leading-loose">
            <p>{questionValue}</p>
          </div>
          <div className="flex text-gray-300 mt-4 font-medium">
            <p className="mr-4 bg-cyan-700 p-2 rounded-2xl">Module: {module}</p>
            <p className="bg-cyan-700 p-2 rounded-2xl">Marks: {marks}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-medium">Author: </h2>
          <p className="text-lg mt-2 italic">
            {author.username}{" "}
            <span className="text-cyan-600">{`(${author.email})`}</span>
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-medium">Created at:</h2>
          <p className="text-lg mt-2 italic">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

const BACK_ICON = () => (
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
      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
    />
  </svg>
);

export default QuestionDetails;
