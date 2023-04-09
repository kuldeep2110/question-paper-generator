import { FC } from "react";
import LargeHeading from "../../../components/ui/LargeHeading";
import RadixDialog from "../../../components/ui/Dialog";
import { SimpleGrid } from "@mantine/core";

interface SubjectPropsProps {}

const SubjectProps: FC<SubjectPropsProps> = ({}) => {
  return (
    <div>
      <div className="flex justify-center">
        <LargeHeading>Courses in your college</LargeHeading>
      </div>
      <div className="pt-6 flex justify-center">
        <RadixDialog
          title="Add Course"
          description="Add a new Course to the database. Click save when you're done."
          name="Name"
          username="No of modules"
        />
      </div>

      <div className="pt-12 pb-6 flex justify-center">
        {/* list of subjects with name, no of modules and total questions and clicking it takes to questions filtered with that subject and nice colours with hovering */}
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
              <div className="text-[15px] text-mauve11 mt-[10px]">
                5 modules
              </div>
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
              <div className="text-[15px] text-mauve11 mt-[10px]">
                5 modules
              </div>
              <div className="text-[15px] text-mauve11 mt-[10px]">
                100 questions
              </div>
            </div>
          </div>
        </SimpleGrid>
      </div>
    </div>
  );
};

export default SubjectProps;
