import { FC } from "react";
import { SimpleGrid } from "@mantine/core";

interface SubjectListProps {}

const SubjectList: FC<SubjectListProps> = ({}) => {
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
      <div className="bg-[#1b1a24] hover:bg-[#211F2D] shadow-fuchsia-900 shadow-[0_0_0_1px] rounded-[6px] p-[20px] cursor-pointer">
        <div className="text-[20px] font-medium text-mauve5">
          Operating Systems
        </div>
        <div className="mt-10">
          <div className="text-[15px] text-mauve11 mt-[10px]">5 modules</div>
          <div className="text-[15px] text-mauve11 mt-[10px]">
            100 questions
          </div>
        </div>
      </div>
      <div className="bg-[#1b1a24] hover:bg-[#211F2D] shadow-fuchsia-900 shadow-[0_0_0_1px] rounded-[6px] p-[20px] cursor-pointer">
        <div className="text-[20px] font-medium text-mauve5">
          Operating Systems
        </div>
        <div className="mt-10">
          <div className="text-[15px] text-mauve11 mt-[10px]">5 modules</div>
          <div className="text-[15px] text-mauve11 mt-[10px]">
            100 questions
          </div>
        </div>
      </div>
    </SimpleGrid>
  );
};

export default SubjectList;
