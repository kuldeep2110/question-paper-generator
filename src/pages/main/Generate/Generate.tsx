import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionAuthorJoin } from "../../../utils/types";
import { Group, Loader, NumberInput } from "@mantine/core";
import { supabase } from "../../../supabase/supabaseClient";
import { useAuth } from "../../../firebase/contexts/AuthContext";
import { SubjectQuestionJoin } from "../../../utils/types";
import { User } from "firebase/auth";
import { PostgrestError } from "@supabase/supabase-js";
import { notifications } from "@mantine/notifications";
import { Button } from "@mantine/core";
import { getSupabaseErrorMessage } from "../../../utils/getErrorMessage";
import { IconX } from "@tabler/icons-react";
import { NumberToArray } from "../../../utils/NumberToArray";
import { Checkbox } from "@mantine/core";
import { SelectSubject } from "../../../utils/SelectSubject";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import CyanButton from "../../../components/ui/CyanButton";

interface GenerateProps {}

type PaperInputType = {
  subject: string;
  totalMarks: number | "";
  modules: string[];
  marksPerModule: MarksPerModule[];
};

type MarksPerModule = {
  module: string;
  marks: number | "";
};

const Generate: FC<GenerateProps> = ({}) => {
  const { currentUser } = useAuth();

  // user state
  const [user, setUser] = useState<User | null>(null);

  // main data
  const [subjectsWithQuestions, setSubjectsWithQuestions] = useState<
    SubjectQuestionJoin[]
  >([]);

  // select subject state
  const [paperInputData, setPaperInputData] = useState<PaperInputType>({
    subject: "",
    totalMarks: "",
    modules: [],
    marksPerModule: [],
  });

  // loading state
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * USE EFFECT
   */
  useEffect(() => {
    fetchUser_Questions_Subjects();
  }, []);

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

  //   const handleGeneratePaper = () => {
  // const paper = generateQuestionPaper(questions, totalMarks);
  // setPaper(paper);
  //   };

  //   const handleDownloadPaper = () => {
  // Implement download logic using a library like React-PDF
  //   };

  const handleSubjectChange = (e: string) => {
    setPaperInputData({
      ...paperInputData,
      subject: e,
      modules: [],
    });
  };

  const handleTotalMarksChange = (e: number) => {
    setPaperInputData({
      ...paperInputData,
      totalMarks: e,
    });
  };

  const handleModuleChange = (modules: string[]) => {
    const sortedModules = modules.sort((a, b) => parseInt(a) - parseInt(b));

    const marksPerModule = sortedModules.map((module) => {
      return {
        module: module,
        marks: 0,
      };
    });

    setPaperInputData({
      ...paperInputData,
      modules: sortedModules,
      marksPerModule: marksPerModule,
    });
  };

  if (loading) {
    return (
      <div className="pt-56 flex justify-center item-center text-lg">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto  h-auto">
      <div className="pt-10 flex justify-center items-center">
        <div className="border border-slate-600 tracking-wider md:p-4 rounded-lg font-sans shadow-2xl transition duration-300 ease-in-out transform mb-6 bg-gray-700 lg:w-3/4 p-2">
          {/* 
                Select Subject
            */}
          <div className="md:flex md:justify-between">
            <div className=" mr-2">
              <div className="text-xl font-bold text-gray-300 pb-4 pt-3">
                Select Subject
              </div>
              <div className="flex justify-between items-center p-1">
                <Select onValueChange={handleSubjectChange}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Subject?" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectsWithQuestions.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id!}>
                        {subject.subject_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="text-xl font-bold text-gray-300 pb-4 pt-3">
                Total Marks :
              </div>
              <div className="p-1">
                <NumberInput
                  placeholder="Total Marks"
                  styles={{
                    input: {
                      width: 300,
                      backgroundColor: "#374151",
                      color: "white",
                    },
                    control: {
                      backgroundColor: "#374151",
                      color: "white",
                    },
                  }}
                  disabled={!paperInputData.subject}
                  value={paperInputData.totalMarks}
                  min={0}
                  onChange={handleTotalMarksChange}
                />
              </div>
            </div>
          </div>

          {/* 
                Select Subject END
            */}
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          {/* MODULE */}
          <div>
            <div className="text-xl font-bold text-gray-300 pb-4">Module</div>
            {paperInputData.subject && paperInputData.totalMarks ? (
              <>
                <div className="flex justify-between items-center">
                  <Checkbox.Group
                    value={paperInputData.modules}
                    onChange={handleModuleChange}
                  >
                    <Group mt="xs">
                      {NumberToArray(
                        SelectSubject(
                          subjectsWithQuestions,
                          paperInputData.subject
                        )?.no_of_modules
                      ).map((mod: any) => (
                        <Checkbox
                          styles={{ label: { color: "white" } }}
                          value={mod.value}
                          label={mod.label}
                        />
                      ))}
                    </Group>
                  </Checkbox.Group>
                </div>
              </>
            ) : null}
          </div>

          {/* MODULE END */}
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          {/* START: Marks Per Module */}
          <div>
            <div className="text-xl font-bold text-gray-300 pb-4">
              Marks Per Module
              <p className="text-gray-400 font-normal text-lg"></p>
            </div>
            {/* main */}
            {paperInputData.modules.length > 0 ? (
              <div>
                {paperInputData.marksPerModule.map((item, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <div className="text-cyan-600 text-lg font-bold mr-4 italic">
                      Module {item.module}
                    </div>
                    <div className="flex items-center">
                      <div className="text-gray-100 mr-2">Marks:</div>
                      <NumberInput
                        placeholder="Module Marks"
                        styles={{
                          input: {
                            width: 150,
                            backgroundColor: "#374151",
                            color: "white",
                          },
                          control: {
                            backgroundColor: "#374151",
                            color: "white",
                          },
                        }}
                        value={item.marks}
                        min={0}
                        onChange={(e) => {
                          const newMarksPerModule =
                            paperInputData.marksPerModule.map((item, i) => {
                              if (i === index) {
                                return {
                                  ...item,
                                  marks: e,
                                };
                              } else {
                                return item;
                              }
                            });

                          setPaperInputData({
                            ...paperInputData,
                            marksPerModule: newMarksPerModule,
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {/* End: Marks Per Module */}
        </div>
      </div>
    </div>
  );
};

export default Generate;

// <Select
//   onValueChange={(e) => {
//     setSelectedModule(e);
//   }}
// >
//   <SelectTrigger className="w-[300px]">
//     <SelectValue placeholder="Module?" />
//   </SelectTrigger>
//   <SelectContent>
//     {/*  NumberToArray(
//                       SelectSubject(subjects, subjectValue)?.no_of_modules
//                     ) */}
//     {NumberToArray(
//       SelectSubject(subjectsWithQuestions, selectedSubject)?.no_of_modules
//     ).map((mod: any) => (
//       // {console.log("mod", mod);}
//       <SelectItem key={mod.label} value={mod.value}>
//         {mod.label}
//       </SelectItem>
//     ))}
//   </SelectContent>
// </Select>;
