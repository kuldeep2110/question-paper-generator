import { FC, useEffect } from "react";
import { useState } from "react";
import { LoadingOverlay, Textarea, TextInput } from "@mantine/core";
import { FileInput } from "@mantine/core";
import { Select } from "@mantine/core";
import { NumberInput } from "@mantine/core";
import { supabase } from "../../supabase/supabaseClient";
import { Subject, User, Question } from "../../utils/types";
import { NumberToArray } from "../../utils/NumberToArray";
import { SelectSubject } from "../../utils/SelectSubject";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconExclamationCircle, IconX } from "@tabler/icons-react";
import { PostgrestError } from "@supabase/supabase-js";
import { StorageError } from "@supabase/storage-js";
import { getSupabaseErrorMessage } from "../../utils/getErrorMessage";

interface QuestionFormProps {
  subjects: Subject[];
  userDetails: User | null;
  closeModal: () => void;
}

const QuestionForm: FC<QuestionFormProps> = ({
  subjects,
  userDetails,
  closeModal,
}) => {
  const [titleValue, settitleValue] = useState<string>("");
  const [questionValue, setquestionValue] = useState<string>("");
  const [fileValue, setfileValue] = useState<File | null>(null);
  const [subjectValue, setsubjectValue] = useState<string | null>(null);
  const [moduleValue, setmoduleValue] = useState<string | null>(null);
  const [marksValue, setmarksValue] = useState<number | "">(1);

  const [loading, setLoading] = useState(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userDetails) {
      notifications.show({ message: "User not found" });
      return;
    }

    if (
      !questionValue ||
      !subjectValue ||
      !moduleValue ||
      !marksValue ||
      !titleValue
    ) {
      notifications.show({
        message: "Please fill all the fields",
        icon: <IconExclamationCircle />,
        color: "red",
      });
      return;
    }

    if (titleValue.length > 25) {
      notifications.show({
        message: "Title should be less than 25 characters",
        icon: <IconExclamationCircle />,
        color: "red",
      });
      return;
    }

    if (marksValue < 1 || marksValue > 15) {
      notifications.show({
        message: "Marks should be between 1 and 15",
        icon: <IconExclamationCircle />,
        color: "red",
      });
      return;
    }

    if (isNaN(marksValue)) {
      notifications.show({
        title: "Please enter valid values",
        message: "Marks should be a number",
        icon: <IconExclamationCircle />,
        color: "red",
      });
      return;
    }

    if (fileValue && fileValue.size > 10000000) {
      notifications.show({
        title: "Please enter valid values",
        message: "File size should be less than 10MB",
        icon: <IconExclamationCircle />,
        color: "red",
      });
      return;
    }

    // file should be an image
    if (fileValue && !fileValue.type.includes("image")) {
      notifications.show({
        title: "Please enter valid values",
        message: "File should be an image",
        icon: <IconExclamationCircle />,
        color: "red",
      });
      return;
    }

    // question value should be less than 1000 characters
    if (questionValue.length > 1000) {
      notifications.show({
        title: "Please enter valid values",
        message: "Question should be less than 1000 characters",
        icon: <IconExclamationCircle />,
        color: "red",
      });
      return;
    }

    const file = fileValue;
    const fileExt = file ? file.name.split(".").pop() : null;
    const fileName = file ? `${Math.random()}.${fileExt}` : null;
    const filePath = file ? `${fileName}` : null;

    const authorValue = userDetails.id;
    const orgNameValue = userDetails.org_id;

    const question: Question = {
      title: titleValue,
      question: questionValue,
      marks: marksValue,
      module: parseInt(moduleValue),
      subject_id: subjectValue,
      author_id: authorValue,
      org_id: orgNameValue,
      img_url: filePath,
    };

    setLoading(true);

    try {
      const {
        data: insertedQuestion,
        error: insertError,
        status,
      } = await supabase.from("questions").insert(question).select();

      if (insertError) {
        throw insertError;
      }

      if (file && filePath && status === 201) {
        const { error: fileUploadError } = await supabase.storage
          .from("question_image")
          .upload(filePath, file);

        if (fileUploadError) {
          await supabase
            .from("questions")
            .delete()
            .eq("id", insertedQuestion[0].id);
          throw fileUploadError;
        }
      }

      settitleValue("");
      setquestionValue("");
      setfileValue(null);
      setsubjectValue(null);
      setmoduleValue(null);
      setmarksValue(1);

      notifications.show({
        title: "Success",
        message: "Question added successfully",
        icon: <IconCheck size="1.1rem" />,
        color: "teal",
      });

      // close modal
      closeModal();
    } catch (error: PostgrestError | StorageError | any) {
      notifications.show({
        title: "Cannot add question",
        message: getSupabaseErrorMessage(error),
        color: "red",
        icon: <IconX size="1.1rem" />,
      });
      console.log("add subject error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <LoadingOverlay visible={loading} />
        <div className="flex flex-col">
          <div className="flex flex-col">
            <TextInput
              label={
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
              }
              placeholder="Enter Title/Topic of the question here"
              value={titleValue}
              withAsterisk
              onChange={(event) => settitleValue(event.currentTarget.value)}
              required
            />
          </div>
          <div className="flex flex-col pt-4">
            <Textarea
              label={
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Question
                </label>
              }
              placeholder="Enter your question here..."
              value={questionValue}
              autosize
              minRows={2}
              withAsterisk
              onChange={(event) => setquestionValue(event.currentTarget.value)}
              required
            />
          </div>
          <div className="flex flex-col pt-4">
            <FileInput
              label={
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Image
                </label>
              }
              placeholder="Upload image"
              accept="image/*"
              value={fileValue}
              onChange={setfileValue}
            />
          </div>

          <div className="flex flex-col pt-4">
            <Select
              required
              label={
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Subject
                </label>
              }
              withAsterisk
              placeholder="Select subject"
              data={subjects.map((subject) => {
                return { label: subject.subject_name, value: subject.id! };
              })}
              value={subjectValue}
              onChange={setsubjectValue}
            />
          </div>

          <div className="flex flex-col pt-4">
            <Select
              required
              label={
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Module
                </label>
              }
              withAsterisk
              placeholder="Select Module"
              data={
                subjectValue
                  ? NumberToArray(
                      SelectSubject(subjects, subjectValue)!.no_of_modules
                    )
                  : []
              }
              value={moduleValue}
              onChange={setmoduleValue}
            />
          </div>

          <div className="flex flex-col pt-4">
            <NumberInput
              label={
                <label className="text-gray-700 text-md font-bold mb-2">
                  Marks
                </label>
              }
              placeholder="Enter marks"
              value={marksValue}
              onChange={setmarksValue}
              min={1}
              withAsterisk
              required
            />
          </div>

          {/* <div className="flex flex-col pt-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            Difficulty
          </label>
          <Select
            placeholder="Select difficulty"
            data={[
              { label: "Easy", value: "easy" },
              { label: "Medium", value: "medium" },
              { label: "Hard", value: "hard" },
            ]}
          />
        </div> */}

          {/* submit button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default QuestionForm;
