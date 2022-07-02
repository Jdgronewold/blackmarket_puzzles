import { Box, Heading, Paragraph, RoutedAnchor } from "grommet";

export const SplashPage = () => {
  return (
    <Box fill align="center" justify="start" margin={{ top: "xlarge"}}>
      <Heading size="medium">Welcome to Blackmarket Puzzles!</Heading>
      <Paragraph textAlign="center" color="dark-5" size="xlarge">
        You can sign up <RoutedAnchor path="/sign-up" label="here" /> or, if you
        already have an account, login{" "}
        <RoutedAnchor path="/login" label="here" />.
      </Paragraph>
    </Box>
  );
};
