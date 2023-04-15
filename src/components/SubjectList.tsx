import { FC } from "react";
import { SimpleGrid } from "@mantine/core";
import { Subject } from "../utils/types";

interface SubjectListProps {
  subjects: Subject[];
}

const SubjectList: FC<SubjectListProps> = ({ subjects }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="bg-gray-700 hover:bg-gray-600 shadow-lg rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              {subject.subject_name}
            </h2>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-gray-400">
                  {subject.no_of_modules} Modules
                </p>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectList;
