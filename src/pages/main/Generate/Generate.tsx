import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { PostgrestError } from "@supabase/supabase-js";
import { IconX } from "@tabler/icons-react";
import { User } from "firebase/auth";
import { FC, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../firebase/contexts/AuthContext";
import { supabase } from "../../../supabase/supabaseClient";
import { getSupabaseErrorMessage } from "../../../utils/getErrorMessage";
import { QuestionAuthorJoin, SubjectQuestionJoin } from "../../../utils/types";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import CyanButton from "../../../components/ui/CyanButton";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import HTMLToPDFConverter from "./HtmlToPdf";

interface GenerateProps {}

const Generate: FC<GenerateProps> = ({}) => {
  const { currentUser } = useAuth();

  // user state
  const [user, setUser] = useState<User | null>(null);

  // subject and questions list in that subject
  const [data, setSubjectsData] = useState<SubjectQuestionJoin[]>([]);
  const [selectedSubjectData, setSelectedSubjectData] = useState<
    SubjectQuestionJoin | null | undefined
  >(null);

  // loading state
  const [loading, setLoading] = useState<boolean>(true);

  // url params
  const { subject: subjectParam } = useParams<{ subject: string }>();
  const [selectedSubject, setSelectedSubject] = useState<
    string | null | undefined
  >(null);

  // module
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  /**
   * state for array of objects of following shape
   * {
   * module key and value of type number
   * number_of_questions_of_marks: array of marks and number of questions of that mark
   * selected_questions: number of questions selected of that mark
   * }
   */
  const [questions, setQuestions] = useState<
    {
      module: number;
      number_of_questions_of_marks: { [key: number]: number };
      selected_questions_of_marks: { [key: number]: number };
    }[]
  >([]);

  // filtered questions according to module
  const [filteredQuestions, setFilteredQuestions] = useState<{
    module: number;
    number_of_questions_of_marks: { [key: number]: number };
    selected_questions_of_marks: { [key: number]: number };
  } | null>(null);

  // navigate
  const navigate = useNavigate();

  /**
   * USE EFFECT
   */

  // fetch user questions and subjects
  useEffect(() => {
    fetchUser_Questions_Subjects();
  }, []);

  // subject param state
  useEffect(() => {
    console.log(subjectParam);
    setSelectedSubject(subjectParam);
  }, [subjectParam]);

  // selected subject state
  useEffect(() => {
    if (selectedSubject) {
      const select = data.find(
        (subject) => subject.subject_name === selectedSubject
      );
      setSelectedSubjectData(select);

      // making an array of objects of following shape
      // {
      // module key and value of type number
      // number_of_questions_of_marks: array of marks and number of questions of that mark
      // selected_questions: number of questions selected of that mark
      // }
      const numberOfModules = select?.no_of_modules;
      const modules = numberToArray(numberOfModules!);
      const questionsArray = modules.map((module) => {
        // making an array of questions of particular marks and module
        const numberOfQuestionsOfMarks: { [key: number]: number } = {};
        const selectedQuestionsOfMarks: { [key: number]: number } = {};
        select?.questions?.forEach((question) => {
          if (question.module === module) {
            if (numberOfQuestionsOfMarks[question.marks]) {
              numberOfQuestionsOfMarks[question.marks] =
                numberOfQuestionsOfMarks[question.marks] + 1;
            } else {
              numberOfQuestionsOfMarks[question.marks] = 1;
            }
            selectedQuestionsOfMarks[question.marks] = 0;
          }
        });

        return {
          module,
          number_of_questions_of_marks: numberOfQuestionsOfMarks,
          selected_questions_of_marks: selectedQuestionsOfMarks,
        };
      });
      console.log(questionsArray);
      setQuestions(questionsArray);
    }
  }, [data]);

  // module and questions of particular mark state
  useEffect(() => {
    if (selectedSubjectData && selectedModule) {
      const filteredQuestions = questions.find(
        (question) => question.module === parseInt(selectedModule)
      );
      if (filteredQuestions) {
        setFilteredQuestions(filteredQuestions);
      }
    }
  }, [selectedModule]);

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

      setSubjectsData(subjectAndQuestionsData as SubjectQuestionJoin[]);
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

  function numberToArray(num: number) {
    const arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  }

  const handleSelectQuestions = (
    module: number,
    mark: number,
    increment: number
  ) => {
    setQuestions((prevState) => {
      const updatedQuestions = [...prevState];
      const questionIndex = updatedQuestions.findIndex(
        (question) => question.module === module
      );
      if (questionIndex !== -1) {
        const selectedQuestionsOfMarks = {
          ...updatedQuestions[questionIndex].selected_questions_of_marks,
        };
        const prevSelectedCount = selectedQuestionsOfMarks[mark] || 0;
        const newSelectedCount = prevSelectedCount + increment;
        if (
          newSelectedCount >= 0 &&
          newSelectedCount <=
            prevState[questionIndex].number_of_questions_of_marks[mark]
        ) {
          selectedQuestionsOfMarks[mark] = newSelectedCount;
          updatedQuestions[questionIndex].selected_questions_of_marks =
            selectedQuestionsOfMarks;
        }
      }
      return updatedQuestions;
    });
  };

  const handleSelectSubjectFormSubmission = (e: any) => {
    e.preventDefault();
    if (!selectedSubject) {
      notifications.show({
        title: "Error!",
        message: "Please select a subject",
        color: "red",
        icon: <IconX />,
      });
      return;
    }

    navigate(`/generate/${selectedSubject}`);
  };

  if (loading) {
    return (
      <div className="pt-56 flex justify-center item-center text-lg">
        <Loader />
      </div>
    );
  }

  // const contentRef = useRef<HTMLDivElement>(null);

  // const handleConvertToPDF = () => {
  //   if (contentRef.current) {
  //     html2canvas(contentRef.current).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF();
  //       const imgProps = pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //       pdf.save("converted.pdf");
  //     });
  //   }
  // };

  return (
    <>
      {!subjectParam ? (
        <>
          {/* select subject logic */}
          <div className="container mx-auto  h-auto">
            <h1 className="text-center">Select a subject</h1>
            <div className="pt-10 flex justify-center items-center">
              <form onSubmit={handleSelectSubjectFormSubmission}>
                <Select onValueChange={(e) => setSelectedSubject(e)}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Subject?" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.map((subject) => (
                      <SelectItem key={subject.id} value={subject.subject_name}>
                        {subject.subject_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center justify-center mt-4">
                  <CyanButton>
                    <span>Go</span>
                  </CyanButton>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto  h-auto">
            <div>
              <div className="pt-4 flex items-center justify-between">
                <h1 className="text-4xl font-bold">Generate</h1>
                <div className="flex gap-2 items-center">
                  <Select onValueChange={(e) => setSelectedModule(e)}>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Select Module" />
                    </SelectTrigger>
                    <SelectContent>
                      {numberToArray(selectedSubjectData?.no_of_modules!).map(
                        (module) => (
                          <SelectItem key={module} value={`${module}`}>
                            Module {module}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {/* Display the number of questions of particular marks */}
            {!selectedModule ? (
              <div className="pt-10 flex justify-center items-center">
                <div className="w-[300px]">
                  <h1 className="text-center">Select a module</h1>
                </div>
              </div>
            ) : (
              <>
                <div className="pt-10 flex justify-center items-center">
                  <div className="w-[600px]">
                    {filteredQuestions && (
                      <div className="mt-8">
                        <h2 className="text-xl font-semibold text-white text-center mb-10">
                          Questions for Module {selectedModule}
                        </h2>
                        {Object.entries(
                          filteredQuestions.number_of_questions_of_marks
                        ).map(([mark, count]) => (
                          <div
                            key={mark}
                            className="flex justify-center items-center mt-4 gap-14"
                          >
                            <span className="mr-2 text-gray-300">
                              Marks: {mark}
                            </span>
                            <span className="mr-2 text-gray-300">
                              Count: {count}
                            </span>
                            <button
                              className="px-3 py-2 mr-2 border border-gray-300 rounded text-gray-300 hover:bg-gray-600 focus:outline-none"
                              onClick={() =>
                                handleSelectQuestions(
                                  parseInt(selectedModule),
                                  parseInt(mark),
                                  -1
                                )
                              }
                            >
                              -
                            </button>
                            <span className="text-gray-300">
                              Selected:{" "}
                              {
                                filteredQuestions.selected_questions_of_marks[
                                  mark as any
                                ]
                              }
                            </span>
                            <button
                              className="px-3 py-2 ml-2 border border-gray-300 rounded text-gray-300 hover:bg-gray-600 focus:outline-none"
                              onClick={() =>
                                handleSelectQuestions(
                                  parseInt(selectedModule),
                                  parseInt(mark),
                                  1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* <button onClick={handleConvertToPDF}>Convert to PDF</button> */}

                <HTMLToPDFConverter />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Generate;
