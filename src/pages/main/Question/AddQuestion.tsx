import { FC } from "react";
import LargeHeading from "../../../components/ui/LargeHeading";
import QuestionForm from "../../../components/ui/QuestionForm";

interface AddQuestionProps {}

const AddQuestion: FC<AddQuestionProps> = ({}) => {
  return (
    <>
      <div className="pt-4">
        <div className="flex justify-center">
          <LargeHeading>Add Questions!</LargeHeading>
        </div>
      </div>
      <div className="pt-8">
        <QuestionForm />
      </div>
    </>
  );
};

export default AddQuestion;
