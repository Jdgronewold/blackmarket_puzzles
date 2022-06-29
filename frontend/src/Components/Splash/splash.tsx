import { Box, Paragraph } from "grommet"

export const SplashPage = () => {

  return (
    <Box direction='row' flex overflow={{ horizontal: 'hidden' }} fill>
        <Box flex align='center' justify='center'>
          <Paragraph>Welcome to Blackmarket puzzles!</Paragraph>
        </Box>
    </Box>
  )
}
