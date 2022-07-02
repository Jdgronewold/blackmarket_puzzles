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
import { loginRequest } from "Api/login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAdded } from "State/User/userReducer";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [revealPassword, setRevealPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const onChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (serverError) {
        setServerError("")
      }
      setter(event.target.value);
    }
      

  const onSubmit = async (
    event: FormExtendedEvent<{ email: string; password: string }>
  ) => {
    const value = event.value;
    try {
      const user = await loginRequest({
        identity: value.email,
        password: value.password,
      });
      dispatch(userAdded({ user }))
      navigate("/home");
    } catch (e: any) {
      setServerError(e.response.data.message)
    }
    
  };

  const onCancel = () => {
    if (serverError) {
      setServerError("")
    }
    setEmail("");
    setPassword("");
  };

  return (
    <Box fill align="center" justify="start" margin={{ top: "large" }}>
      <Heading size="medium">Log in</Heading>
      <Box width="medium">
        <Form onReset={onCancel} onSubmit={onSubmit}>
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
        Or, if you need to sign up click{" "}
        <RoutedAnchor path="/sign-up" label="here" />.
      </Paragraph>
    </Box>
  );
};
