import * as Dialog from "@radix-ui/react-dialog";
import { FC, useState } from "react";
import { useAuth } from "../firebase/contexts/AuthContext";
import { Subject } from "../utils/types";
import { supabase } from "../supabase/supabaseClient";
import { LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { PostgrestError } from "@supabase/supabase-js";
import { IconCheck, IconExclamationCircle, IconX } from "@tabler/icons-react";
import { getSupabaseErrorMessage } from "../utils/getErrorMessage";
import CyanButton from "./ui/CyanButton";

interface AddSubjectModalProps {
  title: string;
  description: string;
  name: string;
  username: string;
  addSubject: (subject: Subject) => void;
}

const AddSubjectModal: FC<AddSubjectModalProps> = ({
  title,
  description,
  name,
  username,
  addSubject,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [subname, setsubname] = useState<string>("linear algebra");
  const [no_of_modules, setNo_of_modules] = useState<number>(5);
  const { currentUser } = useAuth();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subname || !no_of_modules) {
      notifications.show({
        message: "Please fill all the fields",
        icon: <IconExclamationCircle />,
        color: "red",
      });
      return;
    }

    if (!currentUser) {
      notifications.show({
        message: "Please login to add subject",
        icon: <IconExclamationCircle />,
        color: "red",
      });
      return;
    }

    // no of modules should be a number
    if (isNaN(no_of_modules)) {
      notifications.show({
        title: "Please enter valid values",
        message: "No of modules should be a number",
        icon: <IconExclamationCircle />,
        color: "red",
      });
      return;
    }

    if (subname.length > 50 || no_of_modules > 30) {
      notifications.show({
        title: "Please enter valid values",
        message:
          "Subject name should be less than 50 characters and no of modules should be less than 30",
        icon: <IconExclamationCircle />,
        color: "red",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: fetchedUser, error: fetchUserErr } = await supabase
        .from("users")
        .select("org_id")
        .eq("email", currentUser?.email);

      if (fetchUserErr) {
        console.log("fetch user error in add subject", fetchUserErr);
        throw fetchUserErr;
      }

      const subject: Subject = {
        subject_name: subname,
        no_of_modules: no_of_modules,
        org_id: fetchedUser[0].org_id,
      };

      await addSubject(subject);

      notifications.show({
        title: "Success!",
        message: "Subject added successfully",
        color: "teal",
        icon: <IconCheck />,
      });

      setOpen(false);
    } catch (error: PostgrestError | any) {
      console.error("An error occurred while adding the subject", error);
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

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <CyanButton>{title}</CyanButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <form onSubmit={submitHandler}>
            <LoadingOverlay visible={loading} overlayBlur={1} />
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              {title}
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              {description}
            </Dialog.Description>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="name"
              >
                {name} *
              </label>
              <input
                required
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                type={"text"}
                onChange={(e) => {
                  setsubname(e.target.value);
                }}
                value={subname}
              />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="username"
              >
                {username}
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="username"
                type={"number"}
                onChange={(e) => setNo_of_modules(e.target.valueAsNumber)}
                value={no_of_modules}
              />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <CyanButton>Submit</CyanButton>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                X
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddSubjectModal;
