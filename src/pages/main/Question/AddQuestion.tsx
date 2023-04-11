import { FC } from "react";
import LargeHeading from "../../../components/ui/LargeHeading";
import QuestionForm from "../../../components/QuestionForm";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import PinkButton from "../../../components/ui/PinkButton";

interface AddQuestionProps {}

const AddQuestion: FC<AddQuestionProps> = ({}) => {
  const [opened, { open, close }] = useDisclosure(false);

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
          onClose={close}
          title="Add Question"
        >
          <QuestionForm />
        </Modal>
        <Group position="center">
          <PinkButton onClick={open}>
            <div className="flex justify-center items-center">
              <i className="mr-1">
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </i>
              <span>Add Question</span>
            </div>
          </PinkButton>
        </Group>
      </div>
    </div>
  );
};

export default AddQuestion;
