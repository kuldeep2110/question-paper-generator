import { FC, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../firebase/contexts/AuthContext";
import { getErrorMessage } from "../utils/getErrorMessage";
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
      const errorMessage = getErrorMessage(error);
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    }
    setLoading(false);
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="name.surname@spit.ac.in"
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
          <Button loading={loading} type="submit" fullWidth mt="xl">
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
