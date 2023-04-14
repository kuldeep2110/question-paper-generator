import { FC, useEffect, useState } from "react";
import LargeHeading from "../../../components/ui/LargeHeading";
import QuestionForm from "../../../components/QuestionForm";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Loader } from "@mantine/core";
import DisplayQuestions from "../../../components/DisplayQuestions";
import { supabase } from "../../../supabase/supabaseClient";
import { useAuth } from "../../../firebase/contexts/AuthContext";
import { Subject, User, Question } from "../../../utils/types";

interface AddQuestionProps {}

const AddQuestion: FC<AddQuestionProps> = ({}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { currentUser } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserAndSubjects = async () => {
      setLoading(true);
      try {
        const { data: userDetails, error: userDetailsError } = await supabase
          .from("users")
          .select("*")
          .eq("email", currentUser?.email);

        if (userDetailsError) {
          throw userDetailsError;
        }

        if (!userDetails?.[0].id) {
          throw new Error("User not found");
        }

        const { data: subjectData, error: subjectError } = await supabase
          .from("subjects")
          .select("*")
          .eq("org_id", userDetails?.[0].org_id);

        if (subjectError) {
          throw subjectError;
        }

        setSubjects(subjectData as Subject[]);
        setUser(userDetails?.[0] as User);
      } catch (error: any) {
        // alert(error?.message);
        console.log("questions page fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndSubjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center pt-4">
        <LargeHeading>Questions</LargeHeading>
      </div>
      <div className="pt-6">
        <Modal
          size="lg"
          closeOnClickOutside={false}
          opened={opened}
          overlayProps={{
            color: "#000",
            opacity: 0.55,
            blur: 3,
          }}
          onClose={close}
          title="Add Question"
        >
          <QuestionForm
            closeModal={close}
            subjects={subjects}
            userDetails={user}
          />
        </Modal>

        <Group position="center">
          <button
            className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-fuchsia-200 px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
            onClick={open}
          >
            Add Question
          </button>
        </Group>
      </div>

      {/* display questions */}

      <div>
        <DisplayQuestions />
      </div>
    </div>
  );
};

export default AddQuestion;
