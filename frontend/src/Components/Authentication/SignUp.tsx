import {
  Box,
  Button,
  Form,
  FormExtendedEvent,
  FormField,
  Heading,
  MaskedInput,
  Paragraph,
  RoutedAnchor,
  Text,
  TextInput,
} from "grommet";
import { Hide, View } from "grommet-icons";

import React from "react";
import { signUpRequest } from "Api/auth/signup";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [revealPassword, setRevealPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  const navigate = useNavigate();

  const onChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setter(event.target.value);

  const onSubmit = async (
    event: FormExtendedEvent<{ name: string; email: string; password: string }>
  ) => {
    try {
      const value = event.value;
      await signUpRequest({
        name: value.name,
        email: value.email,
        password: value.password,
      });
      navigate("/home");
    } catch (e: any) {
      setServerError(e.response.data.message);
    }
  };

  return (
    <Box fill align="center" justify="start" margin={{ top: "large" }}>
      <Heading size="medium">Sign Up</Heading>
      <Box width="medium">
        <Form onReset={() => {}} onSubmit={onSubmit}>
          <FormField label="Name" name="name" required>
            <TextInput name="name" value={name} onChange={onChange(setName)} />
          </FormField>
          <FormField label="Email" name="email" required>
            <MaskedInput
              name="email"
              mask={[
                { regexp: /^[\w\-_.]+$/, placeholder: "example" },
                { fixed: "@" },
                { regexp: /^[\w]+$/, placeholder: "my" },
                { fixed: "." },
                { regexp: /^[\w]+$/, placeholder: "com" },
              ]}
              value={email}
              onChange={onChange(setEmail)}
            />
          </FormField>
          <FormField label="Password" name="password" required>
            <Box width="medium" direction="row" align="center" round="small">
              <TextInput
                plain
                name="password"
                type={revealPassword ? "text" : "password"}
                value={password}
                onChange={onChange(setPassword)}
              />
              <Button
                icon={
                  revealPassword ? (
                    <View size="medium" />
                  ) : (
                    <Hide size="medium" />
                  )
                }
                onClick={() => setRevealPassword(!revealPassword)}
              />
            </Box>
          </FormField>
          <Box direction="row" justify="between" margin={{ top: "medium" }}>
            <Button type="submit" label="Submit" primary />
            <Button type="reset" label="Cancel" />
          </Box>
        </Form>
      </Box>
      {serverError && (
        <Box pad={{ horizontal: "small" }}>
          <Text color="status-error">{serverError}</Text>
        </Box>
      )}
      <Paragraph size="medium" textAlign="center" margin={{ top: "medium" }}>
        If you already have an account click{" "}
        <RoutedAnchor path="/login" label="here" />.
      </Paragraph>
    </Box>
  );
};
