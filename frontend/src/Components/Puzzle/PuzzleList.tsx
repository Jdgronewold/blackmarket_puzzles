import { Grid, ResponsiveContext } from "grommet"

import { IPuzzle } from "Types/Puzzle"
import { PuzzleCard } from "./PuzzleCard"

export const PuzzleList = ({ puzzles}: { puzzles: IPuzzle[] }) => {
  return (
    <ResponsiveContext.Consumer>
    {size => (
      <Grid
        align="start"
        columns={size !== "small" ? { count: "fill", size: "medium" } : { count: "fit", size: "small"}}
        gap="medium"
        margin="medium"
      >
        {puzzles.map((puzzle, index) => (
          <PuzzleCard
            key={puzzle.name}
            puzzle={puzzle}
          />
        ))}
      </Grid>
    )}
  </ResponsiveContext.Consumer>
  )
}