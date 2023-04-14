import { FC } from "react";
import { SimpleGrid } from "@mantine/core";
import { Subject } from "../utils/types";

interface SubjectListProps {
  subjects: Subject[];
}

const SubjectList: FC<SubjectListProps> = ({ subjects }) => {
  return (
    <SimpleGrid
      cols={4}
      spacing={30}
      className="w-full max-w-[1200px] p-8"
      breakpoints={[
        { maxWidth: "62rem", cols: 3, spacing: "md" },
        { maxWidth: "48rem", cols: 2, spacing: "sm" },
        { maxWidth: "36rem", cols: 1, spacing: "sm" },
      ]}
    >
      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="bg-[#1b1a24] hover:bg-[#211F2D] shadow-fuchsia-900 shadow-[0_0_0_1px] rounded-[6px] p-[20px] cursor-pointer"
        >
          <div className="text-[20px] font-medium text-mauve5">
            {subject.subject_name}
          </div>
          <div className="flex justify-between items-end">
            <div className="mt-10">
              <div className="text-[15px] text-mauve11 mt-[10px]">
                {subject.no_of_modules} Modules
              </div>
            </div>
            <div>
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
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </SimpleGrid>
  );
};

export default SubjectList;
