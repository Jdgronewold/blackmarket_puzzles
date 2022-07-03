import { IPuzzle } from "./Puzzle"

export interface User {
  email: string,
  username: string,
  id: number
  Puzzles?: IPuzzle[]
}