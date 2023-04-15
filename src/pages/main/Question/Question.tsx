import { FC, useEffect, useState } from "react";
import DisplayQuestions from "../../../components/questions/DisplayQuestions";
import QuestionHeader from "../../../components/questions/QuestionHeader";
import SkeletonLoader from "../../../components/ui/SkeletonLoader";
import { useAuth } from "../../../firebase/contexts/AuthContext";
import { questions } from "../../../mockdata/QuestionsMockdata";
import { supabase } from "../../../supabase/supabaseClient";
import { Subject, User } from "../../../utils/types";
import { LayoutType } from "../../../utils/types";

interface QuestionProps {}

const Question: FC<QuestionProps> = ({}) => {
  const { currentUser } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const [layoutType, setLayoutType] = useState<LayoutType>(LayoutType.Grid);

  const toggleLayout = () => {
    setLayoutType(
      layoutType === LayoutType.Grid ? LayoutType.List : LayoutType.Grid
    );
  };

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

  useEffect(() => {
    fetchUserAndSubjects();
  }, []);

  /**
   * TODO: Implement pagination
   * TODO: Implement search
   * TODO: Implement filter
   * TODO: Implement sort
   * TODO: Implement loading state
   * TODO: Implement error state
   * TODO: Implement empty state
   * TODO: Implement skeleton loader
   * TODO: Implement question details
   */

  return (
    <>
      <div className="flex flex-col pt-2 pb-4 px-2 max-w-5xl m-auto ">
        <QuestionHeader
          layoutType={layoutType}
          toggleLayout={toggleLayout}
          subjects={subjects}
          user={user}
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
              subjects={subjects}
              user={user}
              questions={questions}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Question;
