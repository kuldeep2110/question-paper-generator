import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionAuthorJoin } from "../../../utils/types";
import { Loader } from "@mantine/core";
import { supabase } from "../../../supabase/supabaseClient";
import { useAuth } from "../../../firebase/contexts/AuthContext";
import { SubjectQuestionJoin } from "../../../utils/types";
import { User } from "firebase/auth";
import { PostgrestError } from "@supabase/supabase-js";
import { notifications } from "@mantine/notifications";
import { getSupabaseErrorMessage } from "../../../utils/getErrorMessage";
import { IconX } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import CyanButton from "../../../components/ui/CyanButton";

interface GenerateProps {}

const Generate: FC<GenerateProps> = ({}) => {
  const { currentUser } = useAuth();

  const [subject, setSubject] = useState<string>("");

  const [user, setUser] = useState<User | null>(null);

  let { subject: subjectParam } = useParams<{ subject: string }>();

  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  const [subjectsWithQuestions, setSubjectsWithQuestions] = useState<
    SubjectQuestionJoin[]
  >([]);

  const [questions, setQuestions] = useState<QuestionAuthorJoin[]>([]);

  // const [paper, setPaper] = useState<Question[]>([]);

  // const [totalMarks, setTotalMarks] = useState<number>(0);

  /**
   * USE EFFECT
   */
  useEffect(() => {
    fetchUser_Questions_Subjects();
  }, []);

  useEffect(() => {
    if (subjectParam) {
      const subject = subjectsWithQuestions.find(
        (subject) => subject.subject_name === subjectParam
      );
      if (subject) {
        setQuestions(subject.questions);
        setSubject(subject.subject_name);
      }
    } else {
      setQuestions([]);
      setSubject("");
    }
  }, [subjectParam]);

  /**
   * FETCH
   */
  const fetchUser_Questions_Subjects = async () => {
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
          .eq("org_id", userDetails?.[0].org_id);

      if (subjectAndQuestionsError) {
        throw subjectAndQuestionsError;
      }

      setSubjectsWithQuestions(
        subjectAndQuestionsData as SubjectQuestionJoin[]
      );
      setUser(userDetails?.[0] as User);
    } catch (error: PostgrestError | any) {
      console.log("generate page error", error);
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

  const handleGeneratePaper = () => {
    // const paper = generateQuestionPaper(questions, totalMarks);
    // setPaper(paper);
  };

  const handleDownloadPaper = () => {
    // Implement download logic using a library like React-PDF
  };

  if (loading) {
    return (
      <div className="pt-56 flex justify-center item-center text-lg">
        <Loader />
      </div>
    );
  }


  if (!subjectParam && subject && questions.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-gray-500 text-center">
        <div className="text-xl font-bold mb-2 capitalize">
          questions have not been added yet in this subject
        </div>
        <div>
          <CyanButton onClick={() => setSubject("")}>
            Select Subject Again
          </CyanButton>
        </div>
      </div>
    );
  }

  /* SELECT SUBJECT */
  if (!subject) {
    return (
      <div className="pt-32 flex justify-center items-center">
        <div className="border border-slate-600 tracking-wider p-4 rounded-lg cursor-pointer font-sans shadow-2xl transition duration-300 ease-in-out transform mb-6 bg-gray-700 h-52 md:h-44 w-3/5">
          <div className="text-2xl font-bold text-center text-gray-100 pb-12 pt-3">
            Select A Subject
          </div>
          <div className="px-6 flex justify-between items-center">
            <Select
              onValueChange={(e) => {
                setSelectedSubject(e);
              }}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Subject?" />
              </SelectTrigger>
              <SelectContent>
                {subjectsWithQuestions.map((subject) => (
                  <SelectItem key={subject.id} value={subject.subject_name}>
                    {subject.subject_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              {selectedSubject ? (
                <CyanButton
                  onClick={() => {
                    // fetch questions for the selected subject
                    setSubject(selectedSubject);
                    setQuestions(
                      subjectsWithQuestions.find((subject) => {
                        return subject.subject_name === selectedSubject;
                      })?.questions as QuestionAuthorJoin[]
                    );
                  }}
                >
                  Select
                </CyanButton>
              ) : (
                // disabled button
                <button className="bg-gray-500 text-gray-100 px-4 py-2 rounded-lg cursor-not-allowed">
                  Select
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="text-cyan-600 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <span
          onClick={() => {
            setQuestions([]);
            setSubject("");
          }}
          className="underline text-lg cursor-pointer"
        >
          Back
        </span>
      </div>
      <h1 className="text-3xl font-bold my-4 text-cyan-600 text-center">
        Question Paper Generator
      </h1>
      <div>
        {questions?.map((question) => (
          <div key={question.id} className="my-4">
            <div className="text-xl font-bold text-gray-700">
              {question.question}
            </div>
            <div className="text-gray-500">
              {question.author_id.username} | {question.author_id.email}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Generate;
