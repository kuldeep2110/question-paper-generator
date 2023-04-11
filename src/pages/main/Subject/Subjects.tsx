import { FC, useEffect, useState } from "react";
import LargeHeading from "../../../components/ui/LargeHeading";
import RadixDialog from "../../../components/Dialog";
import SubjectList from "../../../components/SubjectList";
import { useAuth } from "../../../supabase/AuthContext";
import { supabase } from "../../../supabase/supabaseClient";

interface SubjectPropsProps {}

const SubjectProps: FC<SubjectPropsProps> = ({}) => {
  // const { currentUser } = useAuth();

  // const [subjects, setSubjects] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  // const fetchSubjects = async () => {
  // const { data, error } = await supabase
  //   .from("subjects")
  //   .select("*")
  //   .eq("college_id", currentUser?.uid);

  //     if (error) {
  //       console.log(error);
  //     } else {
  //       setSubjects(data);
  //       setLoading(false);
  //     }
  // };

  //   fetchSubjects();
  // }, []);

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
        <SubjectList />
      </div>
    </div>
  );
};

export default SubjectProps;
