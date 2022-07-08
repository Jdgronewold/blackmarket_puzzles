import { Box, Heading, Text } from "grommet";

import { IPuzzle } from "Types/Puzzle";

export const PuzzleCard = ({ puzzle }: { puzzle: IPuzzle}) => {
  return (
    <Box round="xxsmall" elevation="small" overflow="hidden">
      <Box pad={{ horizontal: "small" }}>
        <Box
          margin={{ top: "small" }}
          direction="row"
          align="center"
          justify="between"
        >
          <Box>
            <Heading level="3" margin="none">
              {puzzle.name}
            </Heading>
          </Box>
        
          <Box align="end" justify="between" gap="xsmall">
            <Text color="dark-5" size="xsmall">
              Puzzle Pieces: {puzzle.count}
            </Text>
          </Box>
        </Box>
        <Text
          size="small"
          color="dark-5"
          margin={{ vertical: "small" }}
          truncate
        >
          {puzzle.description}
        </Text>
      </Box>
    </Box>
  )
}