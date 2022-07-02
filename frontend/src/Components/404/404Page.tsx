import { Box, Heading, Paragraph, RoutedAnchor } from "grommet"

export const MissingPage = () => {
  return (
    <Box fill align="center" justify="start" margin={{ top: "xlarge"}}>
      <Heading size="medium">Oops! No page found</Heading>
      <Paragraph textAlign="center" color="dark-5">
        You can click <RoutedAnchor path="/home" label="here" /> for to return to the homepage
      </Paragraph>
    </Box>
  )
}