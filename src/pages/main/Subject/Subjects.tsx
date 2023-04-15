import { FC, useEffect, useState } from "react";
import LargeHeading from "../../../components/ui/LargeHeading";
import AddSubjectModal from "../../../components/AddSubjectModal";
import SubjectList from "../../../components/SubjectList";
import { useAuth } from "../../../firebase/contexts/AuthContext";
import { supabase } from "../../../supabase/supabaseClient";
import { Loader } from "@mantine/core";
import { Subject } from "../../../utils/types";
import { PostgrestError } from "@supabase/supabase-js";
import { notifications } from "@mantine/notifications";
import { getSupabaseErrorMessage } from "../../../utils/getErrorMessage";
import { IconX } from "@tabler/icons-react";

interface SubjectPropsProps {}

const SubjectProps: FC<SubjectPropsProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetchSubjects = async () => {
    setLoading(true);

    try {
      const { data: user, error: fetchUserErr } = await supabase
        .from("users")
        .select("org_id")
        .eq("email", currentUser?.email);

      if (fetchUserErr) {
        console.log(" fetch user error in fetch subj", fetchUserErr);
        throw fetchUserErr;
      }

      const { data: fetchSubjectsData, error: fetchSubjectsError } =
        await supabase
          .from("subjects")
          .select("*")
          .eq("org_id", user[0].org_id);

      if (fetchSubjectsError) {
        console.log("fetch subjects error in fetch subj", fetchSubjectsError);
        throw fetchSubjectsError;
      }

      setSubjects(fetchSubjectsData as Subject[]);
    } catch (error: PostgrestError | any) {
      console.log("error in fetch subjects", error);
      notifications.show({
        title: "Error!",
        message: getSupabaseErrorMessage(error),
        color: "red",
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  const addSubject = async (subject: Subject) => {
    const { data: insertedSubject, error: newSubjectInsertError } =
      await supabase.from("subjects").insert(subject);

    if (newSubjectInsertError) {
      console.log("error in adding subject", newSubjectInsertError);
      throw newSubjectInsertError;
    }

    // if (insertedSubject) {
    //   setSubjects((prev) => [...prev, insertedSubject[0]]);
    // }

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
      <div className="pt-6 flex justify-center">
        <AddSubjectModal
          addSubject={addSubject}
          title="Add Course"
          description="Add a new Course to the database. Click save when you're done."
          name="Name"
          username="No of modules"
        />
      </div>

      <div className="pt-12 pb-6 flex justify-center">
        {/* list of subjects with name, no of modules and total questions and clicking it takes to questions filtered with that subject and nice colours with hovering */}
        {/* {loading ? <Loader /> : <SubjectList subjects={subjects} />} */}
        {loading ? <Loader /> : <SubjectList subjects={subjects} />}
      </div>
    </div>
  );
};

export default SubjectProps;
