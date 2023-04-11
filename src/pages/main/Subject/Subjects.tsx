import { FC, useEffect, useState } from "react";
import LargeHeading from "../../../components/ui/LargeHeading";
import RadixDialog from "../../../components/Dialog";
import SubjectList from "../../../components/SubjectList";
import { useAuth } from "../../../firebase/contexts/AuthContext";
import { supabase } from "../../../supabase/supabaseClient";
import { Loader } from "@mantine/core";

interface SubjectPropsProps {}

export interface Subject {
  id?: string;
  created_at?: string;
  subject_name: string;
  no_of_modules: number;
  org_name: number;
}

const SubjectProps: FC<SubjectPropsProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetchSubjects = async () => {
    setLoading(true);
    const { data: college, error: fetchUserErr } = await supabase
      .from("users")
      .select("org_name")
      .eq("email", currentUser?.email);
    if (fetchUserErr) {
      console.log(" fetch user error in fetch subj", fetchUserErr);
    } else {
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("org_name", college[0].org_name);
      if (error) {
        console.log("fetch subjects error", error);
      } else {
        setSubjects(data as Subject[]);
      }
    }
    setLoading(false);
  };

  const addSubject = async (subject: Subject) => {
    const { data, error } = await supabase.from("subjects").insert(subject);
    if (error) {
      console.log("error in adding subject", error);
    } else if (data) {
      setSubjects((prev) => [...prev, data[0]]);
    }
    fetchSubjects();
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <LargeHeading>Courses in your college</LargeHeading>
      </div>
      {/* TODO: */}

      {/* ONLY ADMIN USERS CAN DO THIS EG: ORGANISATION ACCOUNTS, NO TEACHERS */}
      {/* <div className="pt-6 flex justify-center">
        <RadixDialog
          addSubject={addSubject}
          title="Add Course"
          description="Add a new Course to the database. Click save when you're done."
          name="Name"
          username="No of modules"
        />
      </div> */}

      <div className="pt-12 pb-6 flex justify-center">
        {/* list of subjects with name, no of modules and total questions and clicking it takes to questions filtered with that subject and nice colours with hovering */}
        {/* {loading ? <Loader /> : <SubjectList subjects={subjects} />} */}
        {loading ? <Loader /> : <SubjectList subjects={subjects} />}
      </div>
    </div>
  );
};

export default SubjectProps;
