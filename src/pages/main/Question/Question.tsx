import { FC, useEffect, useState } from "react";
import DisplayQuestions from "../../../components/questions/DisplayQuestions";
import QuestionHeader from "../../../components/questions/QuestionHeader";
import SkeletonLoader from "../../../components/ui/SkeletonLoader";
import { useAuth } from "../../../firebase/contexts/AuthContext";
import { mockQuestions } from "../../../mockdata/QuestionsMockdata";
import { supabase } from "../../../supabase/supabaseClient";
import {
  SubjectQuestionJoin,
  User,
} from "../../../utils/types";
import { LayoutType } from "../../../utils/types";
import { PostgrestError } from "@supabase/supabase-js";
import { notifications } from "@mantine/notifications";
import { getSupabaseErrorMessage } from "../../../utils/getErrorMessage";
import { IconX } from "@tabler/icons-react";

interface QuestionProps {}

const Question: FC<QuestionProps> = ({}) => {
  const { currentUser } = useAuth();
  // const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [subjectsWithQuestions, setSubjectsWithQuestions] = useState<
    SubjectQuestionJoin[]
  >([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const [layoutType, setLayoutType] = useState<LayoutType>(LayoutType.List);

  const toggleLayout = () => {
    setLayoutType(
      layoutType === LayoutType.Grid ? LayoutType.List : LayoutType.Grid
    );
  };

  const fetchUser_Questions_Subjects = async () => {
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

      const { data: subjectAndQuestionsData, error: subjectAndQuestionsError } =
        await supabase
          .from<"subjects", SubjectQuestionJoin>("subjects")
          .select("*, questions(*)")
          .eq("org_id", userDetails?.[0].org_id);

      if (subjectAndQuestionsError) {
        throw subjectAndQuestionsError;
      }

      // console.log(subjectAndQuestionsData);
      // setQuestions(subjectAndQuestionsData.flatMap((s) => s.questions));
      setSubjectsWithQuestions(
        subjectAndQuestionsData as SubjectQuestionJoin[]
      );
      setUser(userDetails?.[0] as User);
    } catch (error: PostgrestError | any) {
      console.log("questions page fetch error", error);
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

  useEffect(() => {
    fetchUser_Questions_Subjects();
  }, []);

  /**
   * TODO: Implement pagination
   * TODO: Implement search
   * TODO: Implement filter
   * TODO: Implement sort
   * TODO: Implement loading state
   * TODO: Implement error state
   * TODO: Implement empty state
   * TODO: Implement question details
   */

  return (
    <>
      <div className="flex flex-col pt-2 pb-4 px-2 max-w-5xl m-auto ">
        <QuestionHeader
          layoutType={layoutType}
          toggleLayout={toggleLayout}
          subjects={subjectsWithQuestions}
          user={user}
          fetchUser_Questions_Subjects={fetchUser_Questions_Subjects}
        />
        <div>
          {loading ? (
            Array(10)
              .fill(0)
              .map((_, index) => (
                <div className="pb-4" key={index}>
                  <SkeletonLoader />
                </div>
              ))
          ) : (
            <DisplayQuestions
              layoutType={layoutType}
              subjectsWithQuestions={subjectsWithQuestions}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Question;
