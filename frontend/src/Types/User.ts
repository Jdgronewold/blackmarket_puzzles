import { IPuzzle } from "./Puzzle"

export interface User {
  email: string,
  username: string,
  ID: number
  Puzzles?: IPuzzle[]
}