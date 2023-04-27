import { FC, useEffect, useState } from "react";
import QuestionHeader from "../../../components/questions/QuestionHeader";
import {
  LayoutType,
  QuestionAuthorJoin,
  SubjectQuestionJoin,
  User,
} from "../../../utils/types";
import { supabase } from "../../../supabase/supabaseClient";
import { useAuth } from "../../../firebase/contexts/AuthContext";
import { useParams } from "react-router-dom";
import { PostgrestError } from "@supabase/supabase-js";
import { notifications } from "@mantine/notifications";
import { getSupabaseErrorMessage } from "../../../utils/getErrorMessage";
import { IconX } from "@tabler/icons-react";
import SkeletonLoader from "../../../components/ui/SkeletonLoader";
import DisplayQuestions from "../../../components/questions/DisplayQuestions";

interface SubjectFilteredQuestionsProps {}

const SubjectFilteredQuestions: FC<SubjectFilteredQuestionsProps> = ({}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [layoutType, setLayoutType] = useState<LayoutType>(LayoutType.Grid);
  const [subjectsWithQuestions, setSubjectsWithQuestions] = useState<
    SubjectQuestionJoin[]
  >([]);

  const { currentUser } = useAuth();

  const { subject: subjectParam } = useParams<{ subject: string }>();

  /**
   * toggle layout type
   */

  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionAuthorJoin | null>(null);

  const toggleLayout = () => {
    setLayoutType(
      layoutType === LayoutType.Grid ? LayoutType.List : LayoutType.Grid
    );
  };

  const handleBack = () => {
    setSelectedQuestion(null);
  };

  const fetchUser_Questions_FilteredSubject = async () => {
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
          .from("subjects")
          .select("*, questions(*, author_id(email, username))")
          .eq("org_id", userDetails?.[0].org_id)
          .eq("subject_name", subjectParam);

      if (subjectAndQuestionsError) {
        throw subjectAndQuestionsError;
      }

      console.log(subjectAndQuestionsData);

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
    fetchUser_Questions_FilteredSubject();
  }, []);

  return (
    <>
      {!selectedQuestion && (
        <QuestionHeader
        selectedSubject={subjectParam}
          toggleLayout={toggleLayout}
          subjectsWithQuestions={subjectsWithQuestions}
          user={user}
          fetchUser_Questions_Subjects={fetchUser_Questions_FilteredSubject}
        />
      )}
      {loading ? (
        <SkeletonLoader />
      ) : (
        <DisplayQuestions
          subjectsWithQuestions={subjectsWithQuestions}
          layoutType={layoutType}
          selectQuestion={{ selectedQuestion, setSelectedQuestion, handleBack }}
        />
      )}
    </>
  );
};

export default SubjectFilteredQuestions;
