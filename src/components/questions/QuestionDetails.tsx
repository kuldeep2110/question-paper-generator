import { notifications } from "@mantine/notifications";
import { format } from "date-fns";
import { FC } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { getSupabaseErrorMessage } from "../../utils/getErrorMessage";
import { QuestionAuthorJoin } from "../../utils/types";
import CyanButton from "../ui/CyanButton";

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

  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (confirm) {
      supabase
        .from("questions")
        .delete()
        .match({ id: question.id })
        .then((res) => {
          if (res.error) {
            notifications.show({
              title: "Error",
              message: getSupabaseErrorMessage(res.error),
              color: "red",
            });
          } else {
            alert("Question deleted successfully");
            onBack();
            window.location.reload();
          }
        });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-300">
      <div className="p-4 shadow-lg flex justify-between items-center border-b">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="flex flex-col sm:flex-row md:items-center gap-2">
          <CyanButton onClick={onBack}>
            {/* <ArrowIcon /> */}
            <div className="flex items-center gap-1">
              <i>
                <BACK_ICON />
              </i>
              <span>Go Back</span>
            </div>
          </CyanButton>
          {/* <button className="bg-teal-600 hover:bg-teal-700  text-white font-semibold py-2 px-4 rounded flex items-center gap-1 justify-center">
            <i>
              <EDIT_ICON />
            </i>
          </button> */}
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-1 justify-center"
          >
            <i>
              <DELETE_ICON />
            </i>
          </button>
        </div>
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
          <div className="flex text-gray-300 mt-4 font-medium items-center justify-start">
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

const DELETE_ICON = () => (
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
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

const EDIT_ICON = () => (
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
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
    />
  </svg>
);

export default QuestionDetails;
