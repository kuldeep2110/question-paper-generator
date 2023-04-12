import { FC } from "react";
import { useState } from "react";
import { Textarea } from "@mantine/core";
import { FileInput } from "@mantine/core";
import { Select } from "@mantine/core";
import { NumberInput } from "@mantine/core";

interface QuestionFormProps {}

const QuestionForm: FC<QuestionFormProps> = ({}) => {
  const [questionValue, setquestionValue] = useState("");
  const [fileValue, setfileValue] = useState<File | null>(null);
  const [marksValue, setmarksValue] = useState<number | "">(1);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(questionValue);
    console.log(fileValue);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="">
        <label className="text-gray-700 text-sm font-bold mb-2">Question</label>
        <Textarea
          placeholder="Enter the question here"
          autosize
          minRows={2}
          aria-label="My textarea"
          required
          withAsterisk
          value={questionValue}
          onChange={(event) => setquestionValue(event.currentTarget.value)}
        />
      </div>
      <div className="pt-2">
        <label className="text-gray-700 text-sm font-bold mb-2">
          Upload File
        </label>
        <FileInput
          placeholder="Add an image(png or jpeg)"
          icon={IconUpload}
          value={fileValue}
          accept="image/png,image/jpeg"
          onChange={setfileValue}
        />
      </div>
      <div className="pt-2">
        <label className="text-gray-700 text-sm font-bold mb-2">Subject</label>
        <Select
          withAsterisk
          placeholder="Pick one"
          data={[
            { value: "Operating Systems", label: "Operating Systems" },
            { value: "ng", label: "Angular" },
            { value: "svelte", label: "" },
            { value: "vue", label: "Vue" },
          ]}
        />
      </div>
      <div className="pt-2">
        <label className="text-gray-700 text-sm font-bold mb-2">Module</label>
        <Select
          withAsterisk
          placeholder="Pick one"
          data={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
          ]}
        />
      </div>
      <div className="pt-2">
        <label>Marks</label>
        <NumberInput
          placeholder="Enter marks"
          withAsterisk
          min={1}
          max={10}
          value={marksValue}
          onChange={setmarksValue}
        />
      </div>
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const IconUpload = (
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
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
    />
  </svg>
);

export default QuestionForm;
