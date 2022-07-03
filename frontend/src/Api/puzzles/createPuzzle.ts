import { IPuzzle } from "Types/Puzzle"
import axiosRequest from "../request"

interface ICreatePuzzleRequest extends Partial<IPuzzle> {}

export const createPuzzle = async (puzzle: ICreatePuzzleRequest) => {
  const { data } = await axiosRequest<{data: IPuzzle }, ICreatePuzzleRequest>({
    method: "post",
    url: "/api/puzzle",
    body: puzzle
  })
  
  return data
}