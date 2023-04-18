import { FC } from "react";
import { SubjectQuestionJoin } from "../utils/types";
import ArrowIcon from "./ui/ArrowIcon";
import { useNavigate } from "react-router-dom";

interface SubjectListProps {
  subjects: SubjectQuestionJoin[];
}
const SubjectList: FC<SubjectListProps> = ({ subjects }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="bg-gray-700 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 group"
          onClick={() =>
            navigate(`/questions/${subject.subject_name}`)
          }
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">
              {subject.subject_name}
            </h2>
            <div className="flex justify-between items-center pt-4">
              <div className="flex flex-col gap-1 text-lg text-gray-300">
                <p>{subject.no_of_modules} Modules</p>
                {/* no of q's */}
                <p>{subject.questions.length} Questions</p>
              </div>
              <ArrowIcon />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectList;
