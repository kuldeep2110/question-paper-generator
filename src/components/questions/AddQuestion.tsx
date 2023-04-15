import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { Subject, User } from "../../utils/types";
import CyanButton from "../ui/CyanButton";
import QuestionForm from "./QuestionForm";

interface AddQuestionProps {
  subjects: Subject[];
  user: User | null;
}

const AddQuestion: FC<AddQuestionProps> = ({ subjects, user }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
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
      <CyanButton onClick={open}>
        <div className="flex items-center gap-1">
          <span>Add Question</span>
          {ADD_ICON}
        </div>
      </CyanButton>
    </>
  );
};

const ADD_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default AddQuestion;
