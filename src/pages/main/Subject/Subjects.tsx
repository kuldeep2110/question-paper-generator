import { FC } from "react";
import LargeHeading from "../../../components/ui/LargeHeading";
import { Text } from "@mantine/core";
import RadixDialog from "../../../components/ui/Dialog";
import DataTable from "../../../components/ui/DataTable";

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

      <div className="pt-12 w-[1000px] mx-auto">
        <DataTable />
      </div>
    </div>
  );
};

export default SubjectProps;
