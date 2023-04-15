import { FC, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Group,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../firebase/contexts/AuthContext";
import { getFirebaseErrorMessage } from "../utils/getErrorMessage";
import BlueButton from "../components/ui/BlueButton";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = ({}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      const errorMessage = getFirebaseErrorMessage(error);
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-200 min-h-screen w-screen">
      <div className="w-[500px] m-auto pt-20 ">
        <div onClick={() => navigate("/")}>
          <BlueButton>
            <div className="flex items-center justify-center">
              <i className="pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </i>{" "}
              <span>Back</span>
            </div>
          </BlueButton>
        </div>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          className="bg-neutral-50"
        >
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              placeholder="name@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <Group position="apart" mt="lg">
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button
              loading={loading}
              type="submit"
              fullWidth
              mt="xl"
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-2 rounded-md"
            >
              Log in
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default LoginPage;
